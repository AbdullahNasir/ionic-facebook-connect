# Install Process
>Process for installing the app
1. [`Clone the Repository`](https://github.com/AbdullahNasir/ionic-facebook-connect.git).
2. Open the folder in command line
3. `cd` to the `fb-connect` folder.
4. run `npm install`. (with `sudo` if you don't have permissions).
5. run `bower install`.
6. run `grunt serve` once, so that the working files are copied in `www` folder.
7. run `grunt platform:add:ios`
8. run `grunt platform:add:android`
9. run `cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git`
10. For *Android* run `grunt run:android`
11. For IOS run `grunt run:ios`

>The project structure is cloned from [Generator-Ionic](https://github.com/diegonetto/generator-ionic).