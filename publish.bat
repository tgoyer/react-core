@echo off
rd /S /Q publish

REM dotnet v2.2.105
REM "C:\Program Files\dotnet\dotnet.exe" publish ./ReactCore.sln -o ../Publish -c Release --force --self-contained -v d
"C:\Program Files\dotnet\dotnet.exe" publish ./ReactCore.sln -o ../Publish -c Release --force --self-contained
"C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional\MSBuild\15.0\Bin\MSBuild.exe" ReactCore.sln /target:ReactCore_Data:Rebuild /p:OutputPath=..\Publish