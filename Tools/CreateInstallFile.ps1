# Load Windows Forms assembly
Add-Type -AssemblyName System.Windows.Forms

# 1. Open File Dialog to select the source .lnk file
$FileBrowser = New-Object System.Windows.Forms.OpenFileDialog -Property @{
    InitialDirectory = [Environment]::GetFolderPath('Desktop')
    Filter = "Shortcuts (*.lnk)|*.lnk"
    Title = "Select the source .lnk file"
}

if ($FileBrowser.ShowDialog() -eq "OK") {
    $sourcePath = $FileBrowser.FileName

    # 2. Open Save File Dialog to choose destination
    $SaveBrowser = New-Object System.Windows.Forms.SaveFileDialog -Property @{
        InitialDirectory = [Environment]::GetFolderPath('Desktop')
        Filter = "Zip files (*.zip)|*.zip"
        FileName = "Install.zip"
        Title = "Choose where to save the Install.zip"
    }

    if ($SaveBrowser.ShowDialog() -eq "OK") {
        $destinationZip = $SaveBrowser.FileName
        $outputDir = Split-Path -Parent $destinationZip
        $tempLnk = Join-Path $env:TEMP "Install.lnk"

        # 3. Create a temporary copy named 'Install.lnk' to ensure the name inside the ZIP
        Copy-Item -Path $sourcePath -Destination $tempLnk -Force

        # 4. Create the ZIP archive first
        Compress-Archive -Path $tempLnk -DestinationPath $destinationZip -Force

        # 5. Generate SHA256 Checksum of the CREATED ZIP file and save to .txt
        $checksumPath = Join-Path $outputDir "Checksum.txt"
        $zipChecksum = (Get-FileHash -Path $destinationZip -Algorithm SHA256).Hash
        $zipChecksum | Out-File -FilePath $checksumPath
        
        # Cleanup temporary .lnk file
        Remove-Item $tempLnk

        Write-Host "Success!" -ForegroundColor Green
        Write-Host "`nZIP Created: $destinationZip"
        Write-Host "Checksum (SHA256) of ZIP saved to: $checksumPath"
    } else {
        Write-Host "Save operation cancelled." -ForegroundColor Yellow
    }
} else {
    Write-Host "No file selected." -ForegroundColor Yellow
}

# Keep the window open
Write-Host "`nProcess finished. Press any key to exit..."
$null = [System.Console]::ReadKey()
