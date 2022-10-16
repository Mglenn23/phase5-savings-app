# Savings App By MG

Deployed link : https://phase5-savings-app.herokuapp.com/

Saving App can be used for family to teach their kids to save money and use they money to get something they want. This project using react as front end and ruby as backend, other technology: bootstrap, sweet alert, cloudinary.

## Brief Tutorial

- User : Create account user, login, if have balance can buy items (admin only can add balance to user), order item can be cancelled and will return the balance as long as the status still order, like the items, see the total balance and savings data (User savings = total money from admin, balance is user money for buy items, every order will decrease balance).
- Admin : Create account admin, login, can process order list of users (done or cancel), can add/edit/delete items sold in store, can add/edit/delete user data.

## Table of Contents

- [General Info](#general-information)
- [Tools Used](#tools-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Room for Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## General Information

- Each user have their own data
- CRUD Store and User
- Upload Image and save in couldinary
- Balance to buy items
- Simple design website with interactive alert

## Tools Used

- Bootstrap - https://react-bootstrap.github.io/
- Sweetalert2 - https://sweetalert2.github.io/recipe-gallery/sweetalert2-react.html

## Features

List the ready features here:

- User and admin
- Store, order and likes/whistlist (for user)
- Manage store,order and user (for admin)

## Screenshots

![](./screenshoot/Login.jpg)
![](./screenshoot/Store.jpg)
![](./screenshoot/Buy.jpg)
![](./screenshoot/Order.jpg)
![](./screenshoot/Likes.jpg)
![](./screenshoot/Account.jpg)
![](./screenshoot/adminManageStore.jpg)
![](./screenshoot/adminManageUser.jpg)
![](./screenshoot/adminOrderList.jpg)

## Room for Improvement

There is a plan for improvement with this project, to make this game more interactive.

Room for improvement:

- Improvement to be done page for tutorial
- Improvement to be done layout and design
- Improvement to be done interactive information about savings

## Acknowledgements

- This project was inspired for parenting to teach their kids to save money and get items from savings.
- Many thanks to my Flatiron school lectures
- This is my Phase 5 project at Flatiron school

## Contact

<<<<<<< HEAD
Created by [@mg](https://www.linkedin.com/in/michael-gunawan-030a52194/) - feel free to contact me!
=======
> Note: depending on your Git configuration, your default branch might be named
> `master` or `main`. You can verify which by running
> `git branch --show-current`. If it's `master`, you'll need to run
> `git push heroku master` instead.

Any time you have changes to deploy, just make sure your changes are committed
on the main branch of your repo, and push those changes to Heroku to deploy
them.

You can view your deployed app with:

```sh
heroku open
```

## Environment Setup

### Ruby

Ensure you are running the
[latest Ruby release supported by Heroku][heroku ruby]. At the time of writing,
that's `2.7.3`. You can verify with:

```sh
ruby -v
```

If you don't see `2.7.3`, you can install it and set it as the default version:

```sh
rvm install 2.7.3
rvm --default use 2.7.3
```

You should also install the latest version of `bundler` and `rails`:

```sh
gem install bundler
gem install rails
```

[heroku ruby]: https://devcenter.heroku.com/articles/ruby-support#supported-runtimes

### Install NodeJS

Verify you are running a recent version of Node with:

```sh
node -v
```

If your Node version is less than 14, update it with:

```sh
nvm install node
```

You can also update your npm version with:

```sh
npm i -g npm
```

### Install the Heroku CLI

Follow this guide to install Heroku CLI (if you don't already have it):

- [https://devcenter.heroku.com/articles/heroku-cli#download-and-install](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

### Install Postgresql

Heroku requires that you use Postgresql for your database instead of SQLite.
Postgresql (or just Postgres for short) is an advanced database management
system with more features than SQLite. If you don't already have it installed,
you'll need to set it up.

To install Postgres for WSL, follow this guide:

- [https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql][postgresql wsl]

To install Postgres for OSX, you can use Homebrew:

```sh
brew install postgresql
```

[awesome readmes]: https://github.com/matiassingers/awesome-readme
[postgresql wsl]: https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql
>>>>>>> 79c3f1c (Fixed link)
