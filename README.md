# P6_Sylvain_Gauthier_JustStreamIt
P6_Sylvain_Gauthier_JustStreamIt

JustStreamIt is a web user interface to provide a list of movies to see according to ratings and categories
It's a Front which work directly with API OCMovies 
***
***
## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Start JustStreamIt UI](#Start-JustStreamIt-UI)
5. [FAQs](#faqs)
***
***
## General Info
***
This program is in version 1.0 and aimed the purpose why it has been created.
I wait the result of the meeting with the askers to see if there was some modifications to brign to this version.

***
## Technologies
***
List of technologies used within this project : 
* [Windows 10](https://www.microsoft.com/fr-fr/software-download/windows10): version 21H2
* [Python](https://www.python.org/downloads/release/python-3100/):  version 3.10.0
* [PyCharm](https://www.jetbrains.com/fr-fr/pycharm/): version 2021.2.3
* [git](https://git-scm.com/download/win): version 2.35.1.windows.2
* [VS-Code](https://code.visualstudio.com/download): Version 1.68.0
* [Live Sass Complier](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass): version 3.0.0
* [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer): version 5.7.5

***
## Installation
***
This process suggests that you have admin priviledges on you computer
### Python 3.10.0 installation
***
For installing Python 3.10.0 on your computer go to those adress following the OS you use :

For MacOS :

  Package :
    [Python 3.10.0](https://www.python.org/ftp/python/3.10.0/python-3.10.0post2-macos11.pkg)
    
  Installation guide :
    [Installing Python 3 on MacOS](https://docs.python-guide.org/starting/install3/osx/)

For Linux :

  Package :
    [Python 3.10.0](https://www.python.org/downloads/release/python-3100/)
    [Gzipped source tarball](https://www.python.org/ftp/python/3.10.0/Python-3.10.0.tgz)
    [XZ compressed source tarball](https://www.python.org/ftp/python/3.10.0/Python-3.10.0.tar.xz)
    
 Installation guide :
    [Installing Python 3.10.0 on Linux](https://docs.python-guide.org/starting/install3/linux/)

For Windows :

  Package : 
    [Python 3.10.0](https://www.python.org/ftp/python/3.10.0/python-3.10.0-amd64.exe)
    
  Installation guide :
    [installing Python 3.1.0 on Windows](https://docs.python.org/fr/3/using/windows.html)

***
### Git 2.35.1 installation
***
For installing Git on your computer go to this adress (all OS contents):

[Git installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

***
#### Git configuration 
***
(Even if you did not have done before, create an account on Github at the adress : https://github.com)

1. In order to configure your git IDs , see the following process in GitBash console :
   Type the following command
  
  ``` 
       $ git config --global user.name "your_github_username"
       $ git config --global user.email your_email@your_provider.com
  ```
2. Type the following command to configure the GitBash console interface (optional) :
  
  ```
       $ git config --global color.diff auto
       $ git config --global color.status auto 
       $ git config --global color.branch auto
  ```
***
### Clone the distant repository with Gitbash
***
You have now to clone the distant repository on your computer.
1. type the following command in Gitbash console :
  
  ```
        $ git clone https://github.com/SGauthier2Pro/P6_Sylvain_Gauthier_JustStreamIt.git
  ```
2. Verify that you got the source directory opening an explorator and verifying that all files are in:

![directory_JustStreamIt_UI](https://user-images.githubusercontent.com/99419487/173395213-52052a36-c26d-4723-811d-e9268f4e8c93.png)
![css](https://user-images.githubusercontent.com/99419487/173056732-a10fd34c-51ab-45f8-b5dd-1fee93aa5703.png)
![prefixed](https://user-images.githubusercontent.com/99419487/173056981-41bf3012-eae9-4737-9621-8e8c75621d2a.png)
![fonts](https://user-images.githubusercontent.com/99419487/173056743-d2eed1bd-3491-4e19-870d-d6e8fc14ea93.png)
![js](https://user-images.githubusercontent.com/99419487/173394389-4bc0b9d2-7407-462d-9f34-0766d628f4e9.png)
![classes](https://user-images.githubusercontent.com/99419487/173394563-bab51fd7-d8af-47c6-b0ff-a51ced672f18.png)
![functions](https://user-images.githubusercontent.com/99419487/173394578-d4b4613e-8075-4aa4-bfdf-c6b201809239.png)
![pictures](https://user-images.githubusercontent.com/99419487/173394350-f6ef416d-aa34-49d0-b54f-c2a375923c08.png)
![sass](https://user-images.githubusercontent.com/99419487/173056806-1ffd053a-0202-4f12-a613-593b6793e144.png)
![Base](https://user-images.githubusercontent.com/99419487/173056868-454845d6-a8e3-44e6-9a7e-46ec6738a354.png)
![Pages](https://user-images.githubusercontent.com/99419487/173394953-1a93ed42-eba6-44a7-823a-582579b574e4.png)
![Layout](https://user-images.githubusercontent.com/99419487/173057031-3be4a4fb-39a3-4456-9b99-b1501db4ab37.png)
![Utils](https://user-images.githubusercontent.com/99419487/173057058-6b834328-3c0b-40a9-a8f4-ac856712f0f0.png)

***
### download and run APÏ OCMovies
***
You have now to clone the distant repository for OCMovies API on your computer.
1. type the following command in Gitbash console :
  
  ```
        $ git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
  ```
  you can refere to the README to know how install it and execute it.

***
### installing VS Code
***
For any OS, you can follow the link bellow to install VS-Code :

https://code.visualstudio.com/docs/setup/setup-overview

***
### installing LiveServer
***
You can install LiveServer directly from the extension menu in VS-Code or going to this adress :

https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
 
***
## Start-JustStreamIt-UI
***
Go in the project directory and open the index.html file and enjoy !


***
## FAQs
***

N/A
