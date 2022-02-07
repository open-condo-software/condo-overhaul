# Condo-overhaul

All information is taken from archived CSV files from the reformagh.ru website

## Getting started

```bash
    cp ./env.example ./.env
    docker-compose up -d
    npm i
    npm run create-tables
    npm run sync-data
    npm run start-server
```
# API usage

```bash
wget http://localhost:7000/api/organization/6658320850
wget http://localhost:7000/api/property/c2341fbb-23c3-40ec-a946-a4e67a9f13a2
```

Live demo

```bash
wget http://condo-overhaul.dev.jet.team/api/organization/6658320850
wget http://condo-overhaul.dev.jet.team/api/property/c2341fbb-23c3-40ec-a946-a4e67a9f13a2
```


![image](https://user-images.githubusercontent.com/1640424/152687132-c53ef88c-871a-465d-94ef-4249d653a858.png)
