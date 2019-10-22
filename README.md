To use this quick start, do the following steps.

1. Open solution in Visual Studio (as of this writing, VS 2019 was the latest version)

2. Set the ReactCore.Web project as the startup project.

3. Install Javascript dependencies.
   1. Go into the `./ReactCore.Web/Client` folder.
   2. Run `npm install`.
      1. This may take awhile the first time since there are a few NPM packages that need to be installed.

3. Build project.
   1. This may also take some time the first time as Visual Studio will need to restore any NuGet dependencies.

4. Once built, you can start the project
   1. Run the C# project.  This will start the WebAPI server.
   2. Execute the "launchClient.bat" in the root of the solution.  This will start the JavaScript client server.
   3. Note that this is only necessary during development.  When a publish bundle is created and deployed to a server, 
      it will be a unified build.  All assets will be served from the same server.
