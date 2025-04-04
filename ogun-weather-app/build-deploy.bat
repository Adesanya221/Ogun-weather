@echo off
echo Building and deploying the Ogun Weather App to Firebase Hosting...

cd /d "C:\Users\pc\augment ai\ogun-weather-app"

echo Current directory: %CD%

echo Building the Next.js application...
call npm run build

if %ERRORLEVEL% EQU 0 (
    echo Build successful! Deploying to Firebase Hosting...
    call firebase deploy --only hosting
    
    if %ERRORLEVEL% EQU 0 (
        echo Deployment successful! Your app is now live on Firebase Hosting.
    ) else (
        echo Deployment failed. Please check the error messages above.
    )
) else (
    echo Build failed. Please check the error messages above.
)

pause
