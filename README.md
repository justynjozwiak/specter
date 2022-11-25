# Specter Data Challenge

Hello! This is my proposed solution to the challenge exercice that you've sent me. 

## Stack

React, TypeScript, React Query, Material UI, React Testing Library, create-react-app

## Setup & running

`npm install && npm start`

## What has been done?
- A feed page showing a list of company signals from the dataset
- A detail page showing the attributes for a selected company signal
- Filter signals within the feed view
- Paginate signals within the feed view

## Couple of important notes:
- I added a lot of comments to the code with explanation why I approached something this way and not the other
- architecture / directories created are just a proposal on how files could be divided but it\
highly depends on the real world app scenario and its requirements, if project had clearly separated domains,\
directories like apiHooks, types, etc. could be splitted per domain like `domains/users/apiHooks` or `domains/users/types`
- for exercise purposes I used inline styling to make implementation quicker, this is not totally banned in Material UI\
but not recommended, on the other hand many Material UI component have CCS like props! normally we should use MUI's\
`ThemeProvider` and proper functions like `makeStyles`, etc.
- I've displayed most important attributes of the companies presented in CSV file, displaying all would\
require much much much more time :)
- filtering works for company name
- pagination is done on frontend side because I was dealing with CSV file instead of dedicated API
- added a simple test
