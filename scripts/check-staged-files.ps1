# Check staged files and warn about large files (PowerShell)
# Usage: .\scripts\check-staged-files.ps1

$thresholdMB = 1
$thresholdBytes = $thresholdMB * 1MB

$stagedFiles = git diff --cached --name-only

if (-not $stagedFiles) {
    Write-Output "No staged files detected. Use 'git add' to stage files and re-run this script."
    exit 0
}

$largeFiles = @()
$totalSize = 0

foreach ($file in $stagedFiles) {
    if (Test-Path $file) {
        $item = Get-Item $file
        $totalSize += $item.Length
        if ($item.Length -ge $thresholdBytes) {
            $largeFiles += [PSCustomObject]@{ Path = $file; SizeMB = [math]::Round($item.Length / 1MB, 2) }
        }
    }
}

Write-Output "Staged files count: $($stagedFiles.Count)"
Write-Output "Total staged size: $([math]::Round($totalSize / 1MB, 2)) MB"

if ($largeFiles.Count -gt 0) {
    Write-Host "Warning: The following staged files are larger than $thresholdMB MB:" -ForegroundColor Yellow
    $largeFiles | Format-Table -AutoSize
    Write-Host "Consider removing these files from staging or adding them to .gitignore if they are dependencies or build outputs." -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "No large files staged. Good to commit." -ForegroundColor Green
    exit 0
}
