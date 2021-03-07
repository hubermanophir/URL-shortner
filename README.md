# <center>URL Shortner</center>

![overview img](./images_and_gifs/overview-photo.PNG)

## replit link

https://URL-shortner.hubermanophir.repl.co

## Overview

After downloading the ripo install the necessary packages by entering "npm install" in the terminal (ctrl + j).
To run the server enter "npm run dev" in the terminal.
After running the server go to your browser and enter the following address: "http://localhost:3000/" to enter the application.

## Entering a new short url

In the first input the user can type any address and by pressing the "Short url" button the user's address will be converted into a short url format: "http://localhost:3000/api/shorturl/shorturlid".
The new address is then presented to the user and can be clicked on to get to the desired website.

### Errors

If the user does not enter anything in the input and clicks the short url button he will be prompted with the following message:

![empty input message](./images_and_gifs/empty-error.PNG).

If the user enters an invalid url address he will be prompted with the following message :
![invalid url](./images_and_gifs/invalid-url-address.PNG).

If the user enters an address to a website that does not exist he will be prompted with the following:

![invalid hostname](./images_and_gifs/invalid-hostname.PNG).

## More info

The user can enter a short id and get some information about that url:

1. Short url
2. Original url address
3. Number of redirects
4. Creation date

![more info](./images_and_gifs/more-info.PNG).
By pressing the Ok button the information window will close

## All short url links

Upon loading the page the all short url links will fetch all the links that are currently saved in jsonbin.io / local storage.
By the button the list will open.
![url list](./images_and_gifs/all-short-url.PNG).
After the list is open the user can click individual link And much like the more info button the user is presented with more info:
![url list](./images_and_gifs/additional-info.PNG).
The user can click on the shortened url to go to that website.
