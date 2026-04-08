# Global variables -------------------------------------------------------------

$headerInfo = "`nVitaEngine SDK Setup Utility - Version 1.0.52 - Closed Beta`n"
$vitaEngineSdkSrc = "https://github.com/ali90taz/VitaEngine"
$nodeVersionPattern = "v18\.\d{1,2}\.\d{1,2}"
$gitVersionPattern = "git\sversion\s\d{1,2}\.\d{1,2}\.\d{1,2}\.windows\.\d{1,2}"
$codeVersionPattern = "^(\d{1,2}.\d{1,2}.\d{1,2}[0-9a-f]{40}[x]\d{1,2})$"
$nodeRelease = "node-v18.18.2-win-x64"
$gitRelease = "PortableGit-2.42.0.2-64-bit.7z"
$vscodeRelease = "1.83.1"
$vscodeSrc = "https://vscode.download.prss.microsoft.com/dbazure/download/stable/f1b07bd25dfad64b0167beb15359ae573aecd2cc/VSCode-win32-x64-$($vscodeRelease).zip"
$nodeSrc = "https://nodejs.org/dist/v18.18.2/$($nodeRelease).zip"
$gitSrc = "https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/$($gitRelease).exe" 
$vitaEngineSdkDest += $Env:HOMEDRIVE + $Env:HOMEPATH + "\Documents\VitaEngine SDK"
$vitaEngineProjectsFolder += $Env:HOMEDRIVE + $Env:HOMEPATH + "\Documents\VitaEngine\Projects"
$vitaEngineSdkData += $Env:LOCALAPPDATA + "\" + "VE-SDK"
$vitaEngineSdkScripts += $vitaEngineSdkDest + "\Scripts"
$vitaEngineSdkEnvVar = "VITA_ENGINE_SDK"
$vitaEngineSdkDep += $Env:LOCALAPPDATA + "\VE-SDK\dep"
$gitDest += $vitaEngineSdkDep
$nodeDest += $vitaEngineSdkDep
$vscodeDest += $vitaEngineSdkDep
$Global:gitFound
$Global:nodeFound
$Global:codeFound
$vitaEngineSdkShortcuts = $Env:ProgramData + "\Microsoft\Windows\Start Menu\Programs\VitaEngine SDK"
$desktopPath = $Env:HOMEPATH + "\Desktop"
$mainShortcutName = "VitaEngine SDK"
$Global:installFlag = $false
$Global:uninstallFlag = $false
$Global:repairFlag = $false
$Global:exitFlag = $true
$regFilesPath = $vitaEngineSdkDest + "\Misc\RegFiles"

$welcomeMessage = "This script will guide you through the configuration process to install or`n" +
                  "uninstall the VitaEngine SDK, the process may take some time to`n" +
                  "complete, do you want to continue?"

$warningMessage = "`nWARNING EXECUTING REMOTE SCRIPTS IS HIGHLY UNSAFE, BE SURE TO ONLY EXECUTE TRUSTED SCRIPTS.`n"

# Global Functions -------------------------------------------------------------

function addPath($path) {
    # https://poshcode.gitbook.io/powershell-faq/src/getting-started/environment-variables
    $path = [Environment]::GetEnvironmentVariable("PATH", "Machine") + [IO.Path]::PathSeparator + $path
    [Environment]::SetEnvironmentVariable( "Path", $path, "Machine" )
}

function updatePath {
    # https://shellgeek.com/powershell-refresh-environment-variables/
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
}

function addEnv {

    Param(
        [Parameter()] [String] $name,
        [Parameter()] [String] $value
    )

    [System.Environment]::SetEnvironmentVariable($name, $value, "Machine")
}

function createLnk {

    Param(
        [Parameter()] [String] $lnkName,
        [Parameter()] [String] $lnkPath,
        [Parameter()] [String] $lnkTarget,
        [Parameter()] [String] $lnkArguments,
        [Parameter()] [String] $adminRights
    )

    $wshShell = New-Object -ComObject WScript.Shell
    $shortcut = $wshShell.CreateShortcut("$lnkPath\$lnkName.lnk")
    $shortcut.TargetPath = $lnkTarget

    if ($lnkArguments) {
        $shortcut.Arguments = $lnkArguments
    }

    $shortcut.Save()

    if ($adminRights) {
        # https://stackoverflow.com/questions/28997799/how-to-create-a-run-as-administrator-shortcut-using-powershell
        $bytes = [System.IO.File]::ReadAllBytes("$lnkPath\$lnkName.lnk")
        $bytes[0x15] = $bytes[0x15] -bor 0x20 #set byte 21 (0x15) bit 6 (0x20) ON
        [System.IO.File]::WriteAllBytes("$lnkPath\$lnkName.lnk", $bytes)
    }
}

function wait ($ms) {
    Start-Sleep -Milliseconds $ms
}

function checkEnvVar($name) {
    if ([System.Environment]::GetEnvironmentVariable($name)) {
        return $true
    } else {
        return $false
    }
}

function checkPathVar($name) {

    $tmpName = $name.Replace("\", "\\")

    if ($Env:Path -match $tmpName) {
        return $true
    } else {
        return $false
    }
}

function removeEnvVar($name) {
    [Environment]::SetEnvironmentVariable($name, $null, "Machine")
}

function removePathVar($name) {
    $path = [System.Environment]::GetEnvironmentVariable('PATH', 'Machine')
    $path = ($path.Split(';') | Where-Object { $_ -ne $name}) -join ';'
    [System.Environment]::SetEnvironmentVariable('PATH', $path, 'Machine')
    updatePath
}

function processRegFile ($file) {
    Invoke-Expression "& regedit.exe /s `"$($regFilesPath + $file)`""
}

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
            # My current knowledge does not allow me to understand how it works

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

function checkNodeVersion {

    wait 1000
    printText -t "  Checking for Node.js..." -fc blue -f "nnl"
    $ErrorActionPreference = 'SilentlyContinue'

    if ((Invoke-Expression "& `"node`" -v") -match $nodeVersionPattern) {
        printText -t " [FOUND]" -fc green
        $Global:nodeFound = $true
    } else {
        printText -t " [NOT-FOUND]" -fc red 
        $Global:nodeFound = $false
    }
}

function checkGitVersion {

    wait 1000
    printText -t "  Checking for Git..." -fc blue -f "nnl"
    $ErrorActionPreference = 'SilentlyContinue'

    if ((Invoke-Expression "& `"git`" -v") -match $gitVersionPattern) {
        printText -t " [FOUND]" -fc green
        $Global:gitFound = $true
    } else {
        printText -t " [NOT-FOUND]" -fc red
        $Global:gitFound = $false
    }
}

function checkCodeVersion {

    wait 1000
    printText -t "  Checking for VS Code..." -fc blue -f "nnl"
    $ErrorActionPreference = 'SilentlyContinue'
    $codeVersion = $(Invoke-Expression "& `"code`" -v")
    $codeVersion = [string]::join("",($codeVersion.Split("`n")))

    if ($codeVersion -match $codeVersionPattern) {
        printText -t " [FOUND]" -fc green
        $Global:codeFound = $true
    } else {
        printText -t " [NOT-FOUND]" -fc red
        $Global:codeFound = $false
    }
}

function installElectron {
    Invoke-Expression "& `"npm`" install --platform=win32 electron --save-dev"
}

function openVitaEngine {
    Invoke-Expression "& `"npm`" start ."
}

function createDemoProjectsFolder {
    if (!(Test-Path $vitaEngineProjectsFolder)) {
        New-Item -Path $vitaEngineProjectsFolder -ItemType Directory
    }
    Copy-Item -Path "$($vitaEngineSdkDest)\Demos\*" -Destination $vitaEngineProjectsFolder -Recurse
}

# Code Execution ---------------------------------------------------------------

Clear-Host
printText -t $headerInfo -fs "b" -fc green
printText -t $welcomeMessage -fc blue -fs "b"
printText -t $warningMessage -fc red -fs "b"
printText -t "'Y' for yes and 'N' for no, type option and press 'Enter': " -fc white -fs "b" -f "nnl"

switch (Read-Host) {
    'y' {
        $Global:exitFlag = $false
    }
    'n' {
        $Global:exitFlag = $true
    }
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
        printText -t "`n'Y' for yes and 'N' for no, Type option and press 'Enter': " -fc white -fs "b" -f "nnl"

        switch (Read-Host) {
            'y' {
                $Global:installFlag = $true
                $Global:exitFlag = $false
            }
            'n' {
                $Global:installFlag = $false
                $Global:exitFlag = $true
            }
        }
    }
}

if ($Global:repairFlag) {
    printText -t "`nYou have selected the option to try to repair the VitaEngine SDK installation,`nin this mode the current installation will be deleted and reinstalled." -fc magenta -fs "b"
}

if ($Global:uninstallFlag) {

    printText -t "`nWait a moment, VitaEngine SDK will be uninstalled, do not interrupt this process...`n" -fc green -fs "b"
    printText -t "  Removing registered extensions..." -fc cyan -fs "i" -f "nnl"
    processRegFile "UNREGISTER_VEP_EXTENSION.reg"
    $ErrorActionPreference = 'SilentlyContinue'
    printText -t "  Removing folders and shortcuts..." -fc cyan -fs "i" -f "nnl"
    $ErrorActionPreference = 'SilentlyContinue'
    Remove-Item $vitaEngineSdkData -Recurse -Force -Confirm:$false
    $ErrorActionPreference = 'SilentlyContinue'
    Remove-Item $vitaEngineSdkShortcuts -Recurse -Force -Confirm:$false
    $ErrorActionPreference = 'SilentlyContinue'
    Remove-Item $vitaEngineSdkDest -Recurse -Force -Confirm:$false
    $ErrorActionPreference = 'SilentlyContinue'
    Remove-Item "$($desktopPath)\$($mainShortcutName).lnk" -Force -Confirm:$false
    $ErrorActionPreference = 'SilentlyContinue'
    Remove-Item "$($Env:HOMEDRIVE) + $($Env:HOMEPATH) + \Documents\VitaEngine" -Force -Confirm:$false
    printText -t " [DONE]" -fc green
    printText -t "  Removing environment variables..." -fc cyan -fs "i" -f "nnl"

    if (checkPathVar "$($vitaEngineSdkDep)\$($nodeRelease)") {
        removePathVar "$($vitaEngineSdkDep)\$($nodeRelease)"
    }

    if (checkPathVar "$($vitaEngineSdkDep)\$($gitRelease)\bin") {
        removePathVar "$($vitaEngineSdkDep)\$($gitRelease)\bin"
    }

    if (checkPathVar "$($vitaEngineSdkDep)\$($vscodeRelease)\bin") {
        removePathVar "$($vitaEngineSdkDep)\$($vscodeRelease)\bin"
    }

    removeEnvVar $vitaEngineSdkEnvVar
    updatePath
    printText -t " [DONE]" -fc green

    if ($Global:repairFlag) {
        printText -t "`nThe repair utility has successfully removed VitaEngine SDK from your computer,`nnow wait for the reinstallation process..." -fc green -fs "b"
    } else {
        printText -t "`nUninstallation completed successfully, press any key to exit the setup utility..." -fc green -fs "b" -ta "blink"
        Read-Host
        wait 1000
    }
}

if ($Global:installFlag) {

    printText -t "`nChecking dependencies...`n" -fc cyan -fs "i"
    checkNodeVersion
    checkGitVersion
    checkCodeVersion
    
    if (!$Global:nodeFound) {

        $Global:ProgressPreference = 'SilentlyContinue'
        printText -t "`nNode.JS setup`n" -fc green -fs "b"
        printText -t "  Downloading .zip file into your computer..." -fc cyan -fs "i" -f "nnl"
        Invoke-WebRequest -Uri "$($nodeSrc)" -OutFile "$($Env:Temp + '\node.zip')"
        printText -t " [DONE]" -fc green
        printText -t "  Extracting .zip file..." -fc cyan -fs "i" -f "nnl"
        Expand-Archive -Path "$($Env:Temp + '\node.zip')" -DestinationPath $nodeDest
        printText -t " [DONE]" -fc green
        printText -t "  Adding Node.JS to system PATH..." -fc cyan -fs "i" -f "nnl"
        $ErrorActionPreference = 'SilentlyContinue'
        addPath "$($nodeDest)\$($nodeRelease)"
        printText -t " [DONE]" -fc green
        printText -t "  Updating system PATH..." -fc cyan -fs "i" -f "nnl"
        updatePath
        printText -t " [DONE]" -fc green
        printText -t "  Cleaning used resources..." -fc cyan -fs "i" -f "nnl"  
        Remove-Item "$($Env:Temp)\node.zip"
        printText -t " [DONE]" -fc green
        $ErrorActionPreference = 'SilentlyContinue'

        if ((Invoke-Expression "& `"node`" -v") -match $nodeVersionPattern) {
            $Global:nodeFound = $true
        } else {
            $Global:nodeFound = $false
        }
    }

    if (!$Global:gitFound) {

        $Global:ProgressPreference = 'SilentlyContinue'
        printText -t "`nGit setup`n" -fc green -fs "b"
        printText -t "  Downloading SFX file into your computer..." -fc cyan -fs "i" -f "nnl"
        Invoke-WebRequest -Uri $gitSrc -OutFile "$($Env:Temp + '/git.exe')"
        printText -t " [DONE]" -fc green
        printText -t "  Extracting SFX file..." -fc cyan -fs "i" -f "nnl"
        $ErrorActionPreference = 'SilentlyContinue'
        Invoke-Expression "& `"$($Env:Temp + '/git.exe')`" -y -s2"
        Wait 20000
        printText -t " [DONE]" -fc green
        printText -t "  Copying Git to VE-SDK folder..." -fc cyan -fs "i" -f "nnl"
        Copy-Item -Path "$($Env:Temp + '\PortableGit')" -Destination $gitDest -Recurse
        printText -t " [DONE]" -fc green
        Rename-Item -Path "$($gitDest)\PortableGit" -NewName "$($gitRelease)"
        printText -t "  Adding Git to system PATH..." -fc cyan -fs "i" -f "nnl"
        $ErrorActionPreference = 'SilentlyContinue'
        addPath "$($gitDest)\$($gitRelease)\bin"
        printText -t " [DONE]" -fc green
        printText -t "  Updating system PATH..." -fc cyan -fs "i" -f "nnl"
        $ErrorActionPreference = 'SilentlyContinue'
        updatePath
        printText -t " [DONE]" -fc green
        printText -t "  Cleaning used resources..." -fc cyan -fs "i" -f "nnl"  
        Remove-Item "$($Env:Temp)\PortableGit" -Recurse -Force -Confirm:$false
        Remove-Item "$($Env:Temp)\git.exe"
        printText -t " [DONE]" -fc green

        if ((Invoke-Expression "& `"git`" -v") -match $gitVersionPattern) {
            $Global:gitFound = $true
        } else {
            $Global:gitFound = $false
        }
    }

    if (!$Global:codeFound) {

        $Global:ProgressPreference = 'SilentlyContinue'
        printText -t "`nVisual Studio Code setup`n" -fc green -fs "b"
        printText -t "  Downloading .zip file into your computer..." -fc cyan -fs "i" -f "nnl"
        Invoke-WebRequest -Uri $vscodeSrc -OutFile "$($Env:Temp + '/code.zip')"
        printText -t " [DONE]" -fc green
        printText -t "  Extracting .zip file..." -fc cyan -fs "i" -f "nnl"
        Expand-Archive -Path "$($Env:Temp + '\code.zip')" -DestinationPath $($vscodeDest + "\" + $vscodeRelease)
        printText -t " [DONE]" -fc green
        printText -t "  Adding VS Code to system PATH..." -fc cyan -fs "i" -f "nnl"
        $ErrorActionPreference = 'SilentlyContinue'
        addPath "$($vscodeDest)\$($vscodeRelease)\bin"
        printText -t " [DONE]" -fc green
        printText -t "  Updating system PATH..." -fc cyan -fs "i" -f "nnl"
        updatePath
        printText -t " [DONE]" -fc green
        printText -t "  Cleaning used resources..." -fc cyan -fs "i" -f "nnl"  
        Remove-Item "$($Env:Temp)\code.zip"
        printText -t " [DONE]" -fc green
        $ErrorActionPreference = 'SilentlyContinue'
        $codeVersion = $(Invoke-Expression "& `"code`" -v")
        $codeVersion = [string]::join("",($codeVersion.Split("`n")))

        if ($codeVersion -match $codeVersionPattern) {
            $Global:codeFound = $true
        } else {
            $Global:codeFound = $false
        }

    }

    if (($Global:nodeFound) -and ($Global:gitFound) -and ($Global:codeFound)) {   

        printText -t "`nInstalling VitaEngine SDK into your computer..." -fc cyan -fs "i" -f "nnl"
        git clone -q $($vitaEngineSdkSrc) $($vitaEngineSdkDest)
        wait 1000
        printText -t " [DONE]" -fc green
        printText -t "Adding VitaEngine SDK environment variable..." -fc cyan -fs "i" -f "nnl"
        wait 1000
        $ErrorActionPreference = 'SilentlyContinue'
        addEnv -name $vitaEngineSdkEnvVar -value $vitaEngineSdkDest
        $env:VITA_ENGINE_SDK = [System.Environment]::GetEnvironmentVariable($vitaEngineSdkEnvVar, "Machine")
        printText -t " [DONE]" -fc green
        printText -t "Registering VitaEngine SDK extensions..." -fc cyan -fs "i" -f  "nnl"
        wait 1000
        $ErrorActionPreference = 'SilentlyContinue'
        processRegFile("REGISTER_VEP_EXTENSION.reg")
        printText -t " [DONE]" -fc green
        printText -t "Creating VitaEngine demo projects folder..."
        wait 1000
        $ErrorActionPreference = 'SilentlyContinue'
        createDemoProjectsFolder
        printText -t " [DONE]" -fc green
        printText -t "Creating VitaEngine SDK shortcuts..." -fc cyan -fs "i" -f "nnl"
        wait 1000
        $ErrorActionPreference = 'SilentlyContinue'
        mkdir $vitaEngineSdkShortcuts | Out-Null
        $ErrorActionPreference = 'SilentlyContinue'
        createLnk -lnkName "VitaEngine SDK Setup Utility" -lnkTarget "$($Env:ComSpec)" -lnkPath $vitaEngineSdkShortcuts -lnkArguments "/k powershell -ExecutionPolicy Unrestricted Invoke-Expression -Command (Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/ali90taz/VE-SDK/refs/heads/staging/Scripts/Setup/Install-VE-SDK.ps1' -UseBasicParsing).Content" -adminRights $true
        $ErrorActionPreference = 'SilentlyContinue'
        createLnk -lnkName "Open VitaEngine SDK with VS Code" -lnkTarget "$($Env:ComSpec)" -lnkPath $vitaEngineSdkShortcuts -lnkArguments "/c cd $($vitaEngineSdkDest) & code . & exit"
        $ErrorActionPreference = 'SilentlyContinue'
        createLnk -lnkName $mainShortcutName -lnkTarget $vitaEngineSdkShortcuts -lnkPath $desktopPath
        $ErrorActionPreference = 'SilentlyContinue'
        createLnk -lnkName "VitaEngine SDK Build Utility" -lnkTarget "$($Env:ComSpec)" -lnkPath $vitaEngineSdkShortcuts -lnkArguments "/k powershell -ExecutionPolicy Unrestricted Invoke-Expression -Command (Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/ali90taz/VE-SDK/refs/heads/staging/Scripts/Build/Build-VitaEngine.ps1' -UseBasicParsing).Content" -adminRights $true
        printText -t " [DONE]" -fc green
        printText -t "Installing Electron on VitaEngine SDK folder...`n" -fc cyan -fs "i"
        $currentLocation = Get-Location.Path
        Set-Location $vitaEngineSdkDest
        installElectron
        Set-Location $currentLocation
        wait 5000
        Clear-Host
        printText -t ("`nOpening the VitaEngine for testing purposes,`n" +
                      "after successfull opening, please close the VitaEngine window" +
                      " for terminate setup.") -fc yellow -ta "blink" -fs "b"
        wait 1000                                               
        openVitaEngine
        Clear-Host
        wait 2000

        if ($Global:repairFlag) {
            printText -t ("`nThe VitaEngine SDK installation has been repaired successfully,`nclose the utility and check if the problem is fixed.`n") -fc green
        } else {
            printText -t ("`nThe VitaEngine SDK installation is complete.`n") -fc green
        }
    }
}

if ($Global:exitFlag) {
    printText -t "`nExiting..." -fc yellow -fs "ib"
    wait 1500
    Clear-Host
}


