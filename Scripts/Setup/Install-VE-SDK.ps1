# VitaEngine SDK Setup Utility

# ==============================================================================
# Global Variables
# ==============================================================================

$headerInfo = "`nVitaEngine SDK Setup Utility - Version 1.0.9 Alpha`n"

# Sources
$vitaEngineSdkSrc = "https://github.com/ali90taz/VE-SDK"

$nodeVersionPattern = '^v18\.\d{1,2}\.\d{1,2}$'
$gitVersionPattern  = '^git version \d{1,2}\.\d{1,2}\.\d{1,2}\.windows\.\d{1,2}$'
$codeVersionPattern = '^\d+\.\d+\.\d+$'

# Releases / packages
$nodeReleaseFolder = "node-v18.18.2-win-x64"
$nodeReleaseZip    = "$nodeReleaseFolder.zip"

# Git: separate file name from installed folder name
$gitReleaseFile    = "PortableGit-2.42.0.2-64-bit.7z.exe"
$gitInstallFolder  = "PortableGit-2.42.0.2-64-bit"

$vscodeRelease     = "1.83.1"

# URLs
$vscodeSrc = "https://vscode.download.prss.microsoft.com/dbazure/download/stable/f1b07bd25dfad64b0167beb15359ae573aecd2cc/VSCode-win32-x64-$($vscodeRelease).zip"
$nodeSrc   = "https://nodejs.org/dist/v18.18.2/$nodeReleaseZip"
$gitSrc    = "https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/$gitReleaseFile"
$vitaSdkSrc = "https://github.com/vitasdk/autobuilds/releases/download/master-win-v2.536/vitasdk-x86_64-w64-mingw32-2026-03-24_14-51-23.tar.bz2"

# User paths
$userDocuments = Join-Path "$($Env:HOMEDRIVE)$($Env:HOMEPATH)" "Documents"
$userDesktop   = Join-Path "$($Env:HOMEDRIVE)$($Env:HOMEPATH)" "Desktop"

# SDK paths
$vitaEngineSdkDest        = Join-Path $userDocuments "VitaEngine SDK"
$vitaEngineIdeDest        = Join-Path $vitaEngineSdkDest "Source\IDE"
$vitaEngineProjectsRoot   = Join-Path $userDocuments "VitaEngine"
$vitaEngineProjectsFolder = Join-Path $vitaEngineProjectsRoot "Projects"

# Local app data paths
$vitaEngineSdkData    = Join-Path $Env:LOCALAPPDATA "VE-SDK"
$vitaEngineSdkDep     = Join-Path $vitaEngineSdkData "dep"

# Toolchain paths
$vitaSdkDest = Join-Path $vitaEngineSdkDest "ThirdParty\Toolchains"
$gitDest     = $vitaEngineSdkDep
$nodeDest    = $vitaEngineSdkDep
$vscodeDest  = $vitaEngineSdkDep

# Environment
$vitaEngineSdkEnvVar = "VITA_ENGINE_SDK"

# Shortcuts / misc
$vitaEngineSdkShortcuts = Join-Path $Env:ProgramData "Microsoft\Windows\Start Menu\Programs\VitaEngine SDK"
$desktopPath = $userDesktop
$mainShortcutName = "VitaEngine SDK"
$regFilesPath = Join-Path $vitaEngineSdkDest "Misc\RegFiles"

# Flags
$Global:gitFound = $false
$Global:nodeFound = $false
$Global:codeFound = $false

$Global:installFlag = $false
$Global:uninstallFlag = $false
$Global:repairFlag = $false
$Global:exitFlag = $true

# Messages
$welcomeMessage = "This script will guide you through the configuration process to install or`n" +
                  "uninstall the VitaEngine SDK, the process may take some time to`n" +
                  "complete, do you want to continue?"

$warningMessage = "`nWARNING EXECUTING REMOTE SCRIPTS IS HIGHLY UNSAFE, BE SURE TO ONLY EXECUTE TRUSTED SCRIPTS.`n"

# ==============================================================================
# Helper Functions
# ==============================================================================

function wait ($ms) {
    Start-Sleep -Milliseconds $ms
}

function disableQuickEdit {
    if ($env:OS -ne "Windows_NT") { return }

    $STD_INPUT_HANDLE = -10
    $ENABLE_QUICK_EDIT_MODE = 0x0040
    $ENABLE_EXTENDED_FLAGS = 0x0080

    try {
        if (-not ("NativeMethods" -as [type])) {
            Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public static class NativeMethods
{
    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern IntPtr GetStdHandle(int nStdHandle);

    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern bool GetConsoleMode(IntPtr hConsoleHandle, out int lpMode);

    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern bool SetConsoleMode(IntPtr hConsoleHandle, int dwMode);
}
"@
        }

        $stdInputHandle = [NativeMethods]::GetStdHandle($STD_INPUT_HANDLE)
        $mode = 0

        if ($stdInputHandle -ne [IntPtr]::Zero -and [NativeMethods]::GetConsoleMode($stdInputHandle, [ref]$mode)) {
            $newMode = ($mode -band (-bnot $ENABLE_QUICK_EDIT_MODE)) -bor $ENABLE_EXTENDED_FLAGS
            [NativeMethods]::SetConsoleMode($stdInputHandle, $newMode) | Out-Null
        }
    } catch {
        # Ignore failures to keep setup flow working in hosts where console mode cannot be changed.
        Write-Verbose "Quick Edit mode could not be disabled: $($_.Exception.Message)"
    }
}

function updatePath {
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
}

function checkEnvVar($name) {
    return [bool][System.Environment]::GetEnvironmentVariable($name, "Machine")
}

function addEnv {
    Param(
        [Parameter(Mandatory=$true)] [String] $name,
        [Parameter(Mandatory=$true)] [String] $value
    )

    [System.Environment]::SetEnvironmentVariable($name, $value, "Machine")
}

function removeEnvVar($name) {
    [Environment]::SetEnvironmentVariable($name, $null, "Machine")
}

function addPath($newPath) {
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
    $parts = $currentPath -split ';' | Where-Object { $_ -and $_.Trim() -ne '' }

    if ($parts -notcontains $newPath) {
        $updated = ($parts + $newPath) -join ';'
        [Environment]::SetEnvironmentVariable("Path", $updated, "Machine")
    }
}

function checkPathVar($pathToFind) {
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
    $parts = $currentPath -split ';' | Where-Object { $_ -and $_.Trim() -ne '' }
    return ($parts -contains $pathToFind)
}

function removePathVar($pathToRemove) {
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
    $parts = $currentPath -split ';' | Where-Object { $_ -and $_.Trim() -ne '' }
    $updated = ($parts | Where-Object { $_ -ne $pathToRemove }) -join ';'
    [Environment]::SetEnvironmentVariable("Path", $updated, "Machine")
    updatePath
}

function ensureDirectory($path) {
    if (!(Test-Path $path)) {
        New-Item -Path $path -ItemType Directory -Force | Out-Null
    }
}

function createLnk {
    Param(
        [Parameter(Mandatory=$true)] [String] $lnkName,
        [Parameter(Mandatory=$true)] [String] $lnkPath,
        [Parameter(Mandatory=$true)] [String] $lnkTarget,
        [Parameter()] [String] $lnkArguments,
        [Parameter()] [bool] $adminRights = $false
    )

    ensureDirectory $lnkPath

    $shortcutPath = Join-Path $lnkPath "$lnkName.lnk"

    $wshShell = New-Object -ComObject WScript.Shell
    $shortcut = $wshShell.CreateShortcut($shortcutPath)
    $shortcut.TargetPath = $lnkTarget

    if ($lnkArguments) {
        $shortcut.Arguments = $lnkArguments
    }

    $shortcut.Save()

    if ($adminRights) {
        # "Run as administrator" flag hack for .lnk
        $bytes = [System.IO.File]::ReadAllBytes($shortcutPath)
        $bytes[0x15] = $bytes[0x15] -bor 0x20
        [System.IO.File]::WriteAllBytes($shortcutPath, $bytes)
    }
}

function processRegFile ($file) {
    $fullPath = Join-Path $regFilesPath $file

    if (Test-Path $fullPath) {
        Start-Process -FilePath "regedit.exe" -ArgumentList "/s `"$fullPath`"" -Wait
    } else {
        printText -t " [SKIPPED - FILE NOT FOUND: $file]" -fc yellow
    }
}

function createDemoProjectsFolder {
    ensureDirectory $vitaEngineProjectsFolder

    $demosPath = Join-Path $vitaEngineSdkDest "Demos"
    if (Test-Path $demosPath) {
        Copy-Item -Path (Join-Path $demosPath '*') -Destination $vitaEngineProjectsFolder -Recurse -Force
    }
}

# ==============================================================================
# Console Styling (preserved from original style)
# ==============================================================================

function printText {

    Param (
        [Parameter()] [string] $T,
        [Parameter()] $FC,
        [Parameter()] $BC,
        [Parameter()] [string] $FS,
        [Parameter()] [string] $TA,
        [Parameter()] [string[]] $F
    )
  
    [string] $ansiCode = ''
    [string[]] $globalFlags = "rst", "rv", "nnl"

    function ansiEscape { 
        return "$([char]27)" + "[" 
    }

    function psColorToAnsiColor ($psColor) {
       
        switch ($psColor) {
            Black   { return "0" }
            Red     { return "1" }
            Green   { return "2" }
            Yellow  { return "3" }
            Blue    { return "4" }
            Magenta { return "5" }
            Cyan    { return "6" }
            White   { return "7" }
            default { return "9" }
        }
    }

    function parseFlags ([string[]] $flags) { 
        
        if ($F.Count -eq 0) {
            return $false
        }

        if ($F.Count -gt 1) {
            
            $i = 0

            $F.ForEach({
                if ($globalFlags -notcontains $F[$i]) {
                    return $false
                }
                ++$i
            })

            $i = 0
            $match = 0

            $flags.ForEach({
                if ($F -contains $flags[$i]) {
                    ++$match
                }
                ++$i
            })

            if ($match -eq $flags.Count) {
                return $true
            } else {
                return $false
            }
        }

        if ($globalFlags -notcontains $F[0]) {
            return $false
        }

        $i = 0
        $match = 0

        $flags.ForEach({
            if ($F -contains $flags[$i]) {
                ++$match
            }
            ++$i
        })

        if ($match -eq $flags.Count) {
            return $true
        } else {
            return $false
        }
    }

    function applyTextAnimation ([string] $aniFlags, [ref][string] $ansiCodeRef) {
        $ansiCodeRef.Value += "5"
    }

    function applyForegroundColor ($color, [ref][string] $ansiCodeRef) {

        if ($ansiCodeRef.Value -match "[\[]{1}$") {
            $ansiCodeRef.Value += "3" + (psColorToAnsiColor $color)
        } else {
            $ansiCodeRef.Value += ";3" + (psColorToAnsiColor $color)
        }
    }

    function applyBackgroundColor ($color, [ref][string] $ansiCodeRef) {

        if ($ansiCodeRef.Value -match "[\[]{1}$") {
            $ansiCodeRef.Value += "4" + (psColorToAnsiColor $color)
        } else {
            $ansiCodeRef.Value += ";4" + (psColorToAnsiColor $color)
        }
    }

    function applyFontStyle ([string] $styleFlags, [ref][string] $ansiCodeRef) {
        
        $bold = '1'
        $italic = '3'
        $underline = '4'
        $reverse = '7'
        $strikethrough = '9'

        if ($styleFlags -match "b") {
            if ($ansiCodeRef.Value -match "[\[]{1}$") {
                $ansiCodeRef.Value += $bold
            } else {
                $ansiCodeRef.Value += ";" + $bold
            }
        }

        if ($styleFlags -match "i") {

            if ($ansiCodeRef.Value -match "[\[]{1}$") {
                $ansiCodeRef.Value += $italic
            } else {
                $ansiCodeRef.Value += ";" + $italic
            }
        }

        if ($styleFlags -match "u") {

            if ($ansiCodeRef.Value -match "[\[]{1}$") {
                $ansiCodeRef.Value += $underline
            } else {
                $ansiCodeRef.Value += ";" + $underline
            }
        }

        if ($styleFlags -match "s") {

            if ($ansiCodeRef.Value -match "[\[]{1}$") {
                $ansiCodeRef.Value += $strikethrough
            } else {
                $ansiCodeRef.Value += ";" + $strikethrough
            }
        }

        if (parseFlags "rv") {
            if ($ansiCodeRef.Value -match "[\[]{1}$") {
                $ansiCodeRef.Value += $reverse
            } else {
                $ansiCodeRef.Value += ";" + $reverse
            }
        }
    }

    function applyText ([string] $text, [ref][string] $ansiCodeRef) {
        $ansiCodeRef.Value += 'm' + $text

        if (parseFlags "rst") {
            $ansiCodeRef += ansiEscape + "m"
        }

        if (parseFlags "nnl") {
            Write-Host -NoNewline $ansiCode
        } else {
            Write-Host $ansiCode
        }
    }

    function parseArguments ([ref][string] $ansiCodeRef){

        function checkTextAnimation {
            if ($TA -match "^(Blink)$") {
                return $true
            }
            return $false
        }
                             
        function checkForegroundColor {
            if ($FC -match "^(Black|Red|Green|Yellow|Blue|Magenta|Cyan|White)$") {
                return $true
            }
            return $false
        }

        function checkBackgroundColor {
            if ($BC -match "^(Black|Red|Green|Yellow|Blue|Magenta|Cyan|White)$") {
                return $true
            }
            return $false
        }

        function checkFontStyle {

            # This extremely complex piece of REGEX was
            # taken and adapted from the following link:
            # https://stackoverflow.com/posts/46964463/revisions

            if ($FS -match "^(?!.*(.).*\1)[b|i|u|s]+$") {
                return $true
            }
            return $false
        }

        if ($T) {
            $ansiCodeRef.Value = ansiEscape
            if (checkTextAnimation) {
                applyTextAnimation $TA ($ansiCodeRef)
            }
            if (checkForegroundColor) {
                applyForegroundColor $FC ($ansiCodeRef)
            }
            if (checkBackgroundColor) {
                applyBackgroundColor $BC ($ansiCodeRef)
            }
            if (checkFontStyle) {
                applyFontStyle $FS ($ansiCodeRef)
            }
            applyText $T ($ansiCodeRef)
        }
    }
    parseArguments ([ref] $ansiCode)
}

# ==============================================================================
# Dependency Checks
# ==============================================================================

function checkNodeVersion {
    wait 2000
    printText -t "  Checking for Node.js..." -fc blue -f "nnl"
    $ErrorActionPreference = 'SilentlyContinue'

    $nodeVersion = & node -v 2>$null
    if ($nodeVersion -match $nodeVersionPattern) {
        printText -t " [FOUND]" -fc green
        $Global:nodeFound = $true
    } else {
        printText -t " [NOT-FOUND]" -fc red
        $Global:nodeFound = $false
    }
}

function checkGitVersion {
    wait 2000
    printText -t "  Checking for Git..." -fc blue -f "nnl"
    $ErrorActionPreference = 'SilentlyContinue'

    $gitVersion = & git --version 2>$null
    if ($gitVersion -match $gitVersionPattern) {
        printText -t " [FOUND]" -fc green
        $Global:gitFound = $true
    } else {
        printText -t " [NOT-FOUND]" -fc red
        $Global:gitFound = $false
    }
}

function checkCodeVersion {
    wait 2000
    printText -t "  Checking for VS Code..." -fc blue -f "nnl"
    $ErrorActionPreference = 'SilentlyContinue'

    $codeOutput = & code -v 2>$null
    if ($codeOutput) {
        $codeVersion = ($codeOutput -split "`r?`n")[0]
    } else {
        $codeVersion = $null
    }

    if ($codeVersion -match $codeVersionPattern) {
        printText -t " [FOUND]" -fc green
        $Global:codeFound = $true
    } else {
        printText -t " [NOT-FOUND]" -fc red
        $Global:codeFound = $false
    }
}

# ==============================================================================
# App Actions
# ==============================================================================

function installElectron {
    Param(
        [Parameter(Mandatory=$true)] [string] $workingDir
    )

    $currentLocation = Get-Location
    Set-Location $workingDir
    & npm install --platform=win32 electron --save-dev *> $null
    Set-Location $currentLocation
}

function openVitaEngine {
    Param(
        [Parameter(Mandatory=$true)] [string] $workingDir
    )

    $currentLocation = Get-Location
    Set-Location $workingDir
    & npm start .
    Set-Location $currentLocation
}

# ==============================================================================
# Main Execution
# ==============================================================================

Clear-Host
disableQuickEdit
printText -t $headerInfo -fs "b" -fc green
printText -t $welcomeMessage -fc blue -fs "b"
printText -t $warningMessage -fc red -fs "b"
printText -t "'Y' for yes and 'N' for no, type option and press 'Enter': " -fc white -fs "b" -f "nnl"

switch ((Read-Host).ToLower()) {
    'y' { $Global:exitFlag = $false }
    'n' { $Global:exitFlag = $true }
    default { $Global:exitFlag = $true }
}

if ($Global:exitFlag -eq $false) {
    
    printText -t "`nChecking for previous installation of VitaEngine SDK..." -fc cyan -fs "i" -f "nnl"
        
    if (checkEnvVar $vitaEngineSdkEnvVar) {

        printText -t " [FOUND]`n" -fc green
        printText -t "A valid installation of the VitaEngine SDK was found on your computer, what do you want to do?" -fs "b" -fc green
        printText -t "`n'1' for uninstall current installation." -fc red
        printText -t     "'2' for attempt to repair current installation." -fc yellow
        printText -t     "'3' for exit.`n" -fc blue
        printText -t "Choose an option and press 'Enter': " -fc white -fs "b" -f "nnl"

        switch (Read-Host) {
            '1' {
                $Global:uninstallFlag = $true
                $Global:exitFlag = $false
            }
            '2' {
                $Global:uninstallFlag = $true
                $Global:repairFlag = $true
                $Global:installFlag = $true
                $Global:exitFlag = $false
            }
            '3' {
                $Global:installFlag = $false
                $Global:uninstallFlag = $false
                $Global:exitFlag = $true
            }
            default {
                $Global:installFlag = $false
                $Global:uninstallFlag = $false
                $Global:exitFlag = $true
            }
        }

    } else {

        printText -t " [NOT-FOUND]" -fc red
        printText -t "`nA valid installation of the VitaEngine SDK was not found on your computer, do you want to install it now?" -fs "b"
        printText -t "`n'Y' for yes and 'N' for no, type option and press 'Enter': " -fc white -fs "b" -f "nnl"

        switch ((Read-Host).ToLower()) {
            'y' {
                $Global:installFlag = $true
                $Global:exitFlag = $false
            }
            'n' {
                $Global:installFlag = $false
                $Global:exitFlag = $true
            }
            default {
                $Global:installFlag = $false
                $Global:exitFlag = $true
            }
        }
    }
}

if ($Global:repairFlag) {
    printText -t "`nYou have selected the option to try to repair the VitaEngine SDK installation,`nin this mode the current installation will be deleted and reinstalled." -fc magenta -fs "b"
}

# ==============================================================================
# Uninstall
# ==============================================================================

if ($Global:uninstallFlag) {

    printText -t "`nWait a moment, VitaEngine SDK will be uninstalled, do not interrupt this process...`n" -fc green -fs "b"

    printText -t "  Removing registered extensions..." -fc cyan -fs "i" -f "nnl"
    wait 2000
    $ErrorActionPreference = 'SilentlyContinue'
    processRegFile "UNREGISTER_VEP_EXTENSION.reg"
    printText -t " [DONE]" -fc green

    printText -t "  Removing folders and shortcuts..." -fc cyan -fs "i" -f "nnl"
    wait 2000
    $ErrorActionPreference = 'SilentlyContinue'

    if (Test-Path $vitaEngineSdkData)        { Remove-Item $vitaEngineSdkData -Recurse -Force -Confirm:$false }
    if (Test-Path $vitaEngineSdkShortcuts)   { Remove-Item $vitaEngineSdkShortcuts -Recurse -Force -Confirm:$false }
    if (Test-Path $vitaEngineSdkDest)        { Remove-Item $vitaEngineSdkDest -Recurse -Force -Confirm:$false }

    $desktopShortcut = Join-Path $desktopPath "$mainShortcutName.lnk"
    if (Test-Path $desktopShortcut) { Remove-Item $desktopShortcut -Force -Confirm:$false }

    if (Test-Path $vitaEngineProjectsRoot) {
        Remove-Item $vitaEngineProjectsRoot -Recurse -Force -Confirm:$false
    }

    printText -t " [DONE]" -fc green

    printText -t "  Removing environment variables..." -fc cyan -fs "i" -f "nnl"
    wait 2000

    $nodePath = Join-Path $nodeDest $nodeReleaseFolder
    $gitPath  = Join-Path (Join-Path $gitDest $gitInstallFolder) "bin"
    $codePath = Join-Path (Join-Path $vscodeDest $vscodeRelease) "bin"

    if (checkPathVar $nodePath) { removePathVar $nodePath }
    if (checkPathVar $gitPath)  { removePathVar $gitPath }
    if (checkPathVar $codePath) { removePathVar $codePath }

    removeEnvVar $vitaEngineSdkEnvVar
    updatePath

    printText -t " [DONE]" -fc green

    if ($Global:repairFlag) {
        printText -t "`nThe repair utility has successfully removed VitaEngine SDK from your computer,`nnow wait for the reinstallation process..." -fc green -fs "b"
    } else {
        printText -t "`nUninstallation completed successfully, press any key to exit the setup utility..." -fc green -fs "b" -ta "Blink"
        Read-Host
        $Global:exitFlag = $true
    }
}

# ==============================================================================
# Install
# ==============================================================================

if ($Global:installFlag) {

    printText -t "`nChecking dependencies...`n" -fc cyan -fs "i"
    checkNodeVersion
    checkGitVersion
    checkCodeVersion

    ensureDirectory $vitaEngineSdkDep

    # --------------------------------------------------------------------------
    # Node.js
    # --------------------------------------------------------------------------
    if (!$Global:nodeFound) {

        $Global:ProgressPreference = 'SilentlyContinue'
        printText -t "`nNode.js setup`n" -fc green -fs "b"

        $nodeZipTemp = Join-Path $Env:TEMP "node.zip"

        printText -t "  Downloading .zip file into your computer..." -fc cyan -fs "i" -f "nnl"
        Invoke-WebRequest -Uri $nodeSrc -OutFile $nodeZipTemp
        printText -t " [DONE]" -fc green

        printText -t "  Extracting .zip file..." -fc cyan -fs "i" -f "nnl"
        Expand-Archive -Path $nodeZipTemp -DestinationPath $nodeDest -Force
        printText -t " [DONE]" -fc green

        printText -t "  Adding Node.js to system PATH..." -fc cyan -fs "i" -f "nnl"
        $ErrorActionPreference = 'SilentlyContinue'
        addPath (Join-Path $nodeDest $nodeReleaseFolder)
        printText -t " [DONE]" -fc green

        printText -t "  Updating system PATH..." -fc cyan -fs "i" -f "nnl"
        updatePath
        printText -t " [DONE]" -fc green

        printText -t "  Cleaning used resources..." -fc cyan -fs "i" -f "nnl"
        if (Test-Path $nodeZipTemp) { Remove-Item $nodeZipTemp -Force }
        printText -t " [DONE]" -fc green

        $nodeVersion = & node -v 2>$null
        $Global:nodeFound = ($nodeVersion -match $nodeVersionPattern)
    }

    # --------------------------------------------------------------------------
    # Git
    # --------------------------------------------------------------------------
    if (!$Global:gitFound) {

        $Global:ProgressPreference = 'SilentlyContinue'
        printText -t "`nGit setup`n" -fc green -fs "b"

        $gitExeTemp = Join-Path $Env:TEMP "git-portable.exe"
        $portableGitExtracted = Join-Path $Env:TEMP "PortableGit"
        $gitInstallTarget = Join-Path $gitDest $gitInstallFolder

        printText -t "  Downloading SFX file into your computer..." -fc cyan -fs "i" -f "nnl"
        Invoke-WebRequest -Uri $gitSrc -OutFile $gitExeTemp
        printText -t " [DONE]" -fc green

        printText -t "  Extracting SFX file..." -fc cyan -fs "i" -f "nnl"
        $ErrorActionPreference = 'SilentlyContinue'
        & $gitExeTemp -y -s2 | Out-Null
        wait 20000
        printText -t " [DONE]" -fc green

        printText -t "  Copying Git to VE-SDK folder..." -fc cyan -fs "i" -f "nnl"

        if (Test-Path $gitInstallTarget) {
            Remove-Item $gitInstallTarget -Recurse -Force -Confirm:$false
        }

        if (Test-Path $portableGitExtracted) {
            Copy-Item -Path $portableGitExtracted -Destination $gitDest -Recurse -Force
            Rename-Item -Path (Join-Path $gitDest "PortableGit") -NewName $gitInstallFolder -Force
        }

        printText -t " [DONE]" -fc green

        printText -t "  Adding Git to system PATH..." -fc cyan -fs "i" -f "nnl"
        addPath (Join-Path (Join-Path $gitDest $gitInstallFolder) "bin")
        printText -t " [DONE]" -fc green

        printText -t "  Updating system PATH..." -fc cyan -fs "i" -f "nnl"
        updatePath
        printText -t " [DONE]" -fc green

        printText -t "  Cleaning used resources..." -fc cyan -fs "i" -f "nnl"
        if (Test-Path $portableGitExtracted) { Remove-Item $portableGitExtracted -Recurse -Force -Confirm:$false }
        if (Test-Path $gitExeTemp) { Remove-Item $gitExeTemp -Force }
        printText -t " [DONE]" -fc green

        $gitVersion = & git --version 2>$null
        $Global:gitFound = ($gitVersion -match $gitVersionPattern)
    }

    # --------------------------------------------------------------------------
    # VS Code
    # --------------------------------------------------------------------------
    if (!$Global:codeFound) {

        $Global:ProgressPreference = 'SilentlyContinue'
        printText -t "`nVisual Studio Code setup`n" -fc green -fs "b"

        $codeZipTemp = Join-Path $Env:TEMP "code.zip"
        $codeInstallDir = Join-Path $vscodeDest $vscodeRelease

        printText -t "  Downloading .zip file into your computer..." -fc cyan -fs "i" -f "nnl"
        Invoke-WebRequest -Uri $vscodeSrc -OutFile $codeZipTemp
        printText -t " [DONE]" -fc green

        printText -t "  Extracting .zip file..." -fc cyan -fs "i" -f "nnl"
        ensureDirectory $codeInstallDir
        Expand-Archive -Path $codeZipTemp -DestinationPath $codeInstallDir -Force
        printText -t " [DONE]" -fc green

        printText -t "  Adding VS Code to system PATH..." -fc cyan -fs "i" -f "nnl"
        addPath (Join-Path $codeInstallDir "bin")
        printText -t " [DONE]" -fc green

        printText -t "  Updating system PATH..." -fc cyan -fs "i" -f "nnl"
        updatePath
        printText -t " [DONE]" -fc green

        printText -t "  Cleaning used resources..." -fc cyan -fs "i" -f "nnl"
        if (Test-Path $codeZipTemp) { Remove-Item $codeZipTemp -Force }
        printText -t " [DONE]" -fc green

        $codeOutput = & code -v 2>$null
        if ($codeOutput) {
            $codeVersion = ($codeOutput -split "`r?`n")[0]
        } else {
            $codeVersion = $null
        }

        $Global:codeFound = ($codeVersion -match $codeVersionPattern)
    }

    # --------------------------------------------------------------------------
    # Main Install
    # --------------------------------------------------------------------------
    if (($Global:nodeFound) -and ($Global:gitFound) -and ($Global:codeFound)) {

        $Global:ProgressPreference = 'SilentlyContinue'
        printText -t "`nVitaEngine SDK setup`n" -fc green -fs "b"
        
        printText -t "  Cloning VE-SDK repository into your computer..." -fc cyan -fs "i" -f "nnl"

        if (Test-Path $vitaEngineSdkDest) {
            Remove-Item $vitaEngineSdkDest -Recurse -Force -Confirm:$false
        }

        & git clone -q $vitaEngineSdkSrc $vitaEngineSdkDest
        wait 2000
        printText -t " [DONE]" -fc green

        printText -t "  Adding VitaEngine SDK environment variable..." -fc cyan -fs "i" -f "nnl"
        wait 2000
        addEnv -name $vitaEngineSdkEnvVar -value $vitaEngineSdkDest
        $env:VITA_ENGINE_SDK = [System.Environment]::GetEnvironmentVariable($vitaEngineSdkEnvVar, "Machine")
        printText -t " [DONE]" -fc green

        printText -t "  Registering VitaEngine SDK extensions..." -fc cyan -fs "i" -f "nnl"
        wait 2000
        processRegFile "REGISTER_VEP_EXTENSION.reg"
        printText -t " [DONE]" -fc green

        printText -t "  Creating VitaEngine demo projects folder..." -fc cyan -fs "i" -f "nnl"
        wait 2000
        createDemoProjectsFolder
        printText -t " [DONE]" -fc green

        printText -t "  Creating VitaEngine SDK shortcuts..." -fc cyan -fs "i" -f "nnl"
        wait 2000

        ensureDirectory $vitaEngineSdkShortcuts

        # Setup Utility
        createLnk `
            -lnkName "VitaEngine SDK Setup Utility" `
            -lnkTarget "$($Env:ComSpec)" `
            -lnkPath $vitaEngineSdkShortcuts `
            -lnkArguments "/k powershell -ExecutionPolicy Unrestricted Invoke-Expression -Command (Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/ali90taz/VE-SDK/refs/heads/staging/Scripts/Setup/Install-VE-SDK.ps1' -UseBasicParsing).Content" `
            -adminRights $true

        # Open in VS Code
        createLnk `
            -lnkName "Open VitaEngine SDK with VS Code" `
            -lnkTarget "$($Env:ComSpec)" `
            -lnkPath $vitaEngineSdkShortcuts `
            -lnkArguments "/c cd /d `"$vitaEngineSdkDest`" & code . & exit"

        # Desktop main shortcut -> opens the SDK in VS Code (better UX than opening Start Menu folder)
        createLnk `
            -lnkName $mainShortcutName `
            -lnkTarget "$($Env:ComSpec)" `
            -lnkPath $desktopPath `
            -lnkArguments "/c cd /d `"$vitaEngineSdkDest`" & code . & exit"

        # Build Utility
        createLnk `
            -lnkName "VitaEngine SDK Build Utility" `
            -lnkTarget "$($Env:ComSpec)" `
            -lnkPath $vitaEngineSdkShortcuts `
            -lnkArguments "/k powershell -ExecutionPolicy Unrestricted Invoke-Expression -Command (Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/ali90taz/VE-SDK/refs/heads/staging/Scripts/Build/Build-VitaEngine.ps1' -UseBasicParsing).Content" `
            -adminRights $true

        printText -t " [DONE]" -fc green

        # ----------------------------------------------------------------------
        # VITA-SDK Toolchain
        # ----------------------------------------------------------------------
        printText -t "  Installing VITA-SDK toolchain..." -fc cyan -fs "i" -f "nnl"
        wait 2000

        $vitaSdkArchiveTemp = Join-Path $Env:TEMP "vitasdk.tar.bz2"
        ensureDirectory $vitaSdkDest
        Invoke-WebRequest -Uri $vitaSdkSrc -OutFile $vitaSdkArchiveTemp
        & tar.exe -xf $vitaSdkArchiveTemp -C $vitaSdkDest
        printText -t " [DONE]" -fc green

        if (Test-Path $vitaSdkArchiveTemp) {
            Remove-Item $vitaSdkArchiveTemp -Force
        }

        # ----------------------------------------------------------------------
        # Electron Install
        # ----------------------------------------------------------------------
        printText -t "  Installing Electron on VitaEngine SDK folder..." -fc cyan -fs "i" -f "nnl"

        if (Test-Path $vitaEngineIdeDest) {
            installElectron -workingDir $vitaEngineIdeDest
            printText -t " [DONE]" -fc green
        } else {
            printText -t " [FAIL]" -fc yellow
            printText -t "  IDE folder not found, skipping Electron installation." -fc yellow -fs "b"
        }

        wait 5000

        printText -t ("`nOpening the VitaEngine for testing purposes,`n" +
                      "after successful opening, please close the VitaEngine window" +
                      " to terminate setup.") -fc yellow -ta "Blink" -fs "b"
        wait 2000

        if (Test-Path $vitaEngineIdeDest) {
            openVitaEngine -workingDir $vitaEngineIdeDest
        } else {
            printText -t "`nWARNING: IDE folder not found, skipping runtime test." -fc yellow -fs "b"
        }

        Clear-Host
        wait 3000

        if ($Global:repairFlag) {
            printText -t ("`nThe VitaEngine SDK installation has been repaired successfully,`nclose the utility and check if the problem is fixed.`n") -fc green
        } else {
            printText -t ("`nThe VitaEngine SDK installation is complete.") -fc green
            $Global:exitFlag = $true
        }
    } else {
        printText -t "`nOne or more dependencies could not be installed correctly. Setup aborted.`n" -fc red -fs "b"
    }
}

# ==============================================================================
# Exit
# ==============================================================================

if ($Global:exitFlag) {
    printText -t "`nExiting..." -fc yellow -fs "ib"
    wait 2000
    Clear-Host
}
