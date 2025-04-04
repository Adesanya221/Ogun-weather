# Navigate to the project directory
Set-Location -Path "C:\Users\pc\augment ai\ogun-weather-app"

# Build the Next.js application
Write-Host "Building the Next.js application..."
& npm run build

# Check if the build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful! Deploying to Firebase Hosting..."
    
    # Deploy to Firebase Hosting
    & firebase deploy --only hosting
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Deployment successful! Your app is now live on Firebase Hosting."
    } else {
        Write-Host "Deployment failed. Please check the error messages above."
    }
} else {
    Write-Host "Build failed. Please check the error messages above."
}
