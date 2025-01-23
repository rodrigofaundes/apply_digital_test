<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

This project sync products from Contentful API and save that products in a Postgres database. 
This project have two public endpoints for reports with JWT authentication and another endpoints withdout JWT.

## Project tecnologies
- Node.js 22
- NestJS 10
- Postgres 17
- TypeORM
- Docker & docker-compose
- JWT for authentication
- Swagger API documentation

## Project setup

```bash
$ npm install
```

# .env File

```
# Database
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=apply_db_test

# API contentful config
CONTENTFUL_SPACE_ID=9xs1613l9f7v
CONTENTFUL_ACCESS_TOKEN=I-ThsT55eE_B3sCUWEQyDT4VqVO3x__20ufuie9usns
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_CONTENT_TYPE=product
JWT_SECRET=mysecretkey
```

## Compile and run the project

```bash
$ docker-compose up --build
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API dndpoint documentation

```bash
http://localhost:3000/api/docs
```

## Run SEED
After you build and start the project you need to run seed to populate the database.
In postman you need to run this URL.
That endpoint fill the users and products table.
```
http://localhost:3000/seed/
```

## Endpoints POSTMAN
You can copy this JSON and paste and import on Postman. After that you can all URLS used in this project.
```
{
	"info": {
		"_postman_id": "1c89d9e7-bae4-48da-ac76-c47f128938f7",
		"name": "Nest Aply Digital",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "3460382"
	},
	"item": [
		{
			"name": "CDN Contentful",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "CONTENTFUL_SPACE_ID=9xs1613l9f7v\nCONTENTFUL_ACCESS_TOKEN=I-ThsT55eE_B3sCUWEQyDT4VqVO3x__20ufuie9usns\nCONTENTFUL_ENVIRONMENT=master\nCONTENTFUL_CONTENT_TYPE=product",
					"options": {
						"raw": {
							"language": "text"
						}
					}
				},
				"url": {
					"raw": "https://cdn.contentful.com/spaces/9xs1613l9f7v/environments/master/entries?access_token=I-ThsT55eE_B3sCUWEQyDT4VqVO3x__20ufuie9usns&content_type=product",
					"protocol": "https",
					"host": [
						"cdn",
						"contentful",
						"com"
					],
					"path": [
						"spaces",
						"9xs1613l9f7v",
						"environments",
						"master",
						"entries"
					],
					"query": [
						{
							"key": "access_token",
							"value": "I-ThsT55eE_B3sCUWEQyDT4VqVO3x__20ufuie9usns"
						},
						{
							"key": "content_type",
							"value": "product"
						}
					]
				},
				"description": "URL para traer los productos productivos"
			},
			"response": []
		},
		{
			"name": "00- SEED",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/seed/",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"seed",
						""
					]
				}
			},
			"response": []
		},
		{
			"name": "00- Auth/Login JWT",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"email\": \"rodrigofaundes@applydigital.com\",\n    \"password\": \"ApplyTest@123\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/auth/login",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"auth",
						"login"
					]
				}
			},
			"response": []
		},
		{
			"name": "01- Sync/",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"username\": \"test\",\n    \"password\": \"123\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/sync",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"sync"
					]
				}
			},
			"response": []
		},
		{
			"name": "02- Products/paginated",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"page\":1,\n    \"minPrice\":13,\n    \"maxPrice\":55\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/products/paginated?page=1&name=Apple Watch",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"products",
						"paginated"
					],
					"query": [
						{
							"key": "page",
							"value": "1"
						},
						{
							"key": "minPrice",
							"value": "1810.29",
							"disabled": true
						},
						{
							"key": "maxPrice",
							"value": "1829.92",
							"disabled": true
						},
						{
							"key": "name",
							"value": "Apple Watch"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "03- Products/delete",
			"request": {
				"method": "DELETE",
				"header": [],
				"body": {
					"mode": "urlencoded",
					"urlencoded": []
				},
				"url": {
					"raw": "http://localhost:3000/products/63ac6e99-2544-425d-8311-7a3469b43d42",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"products",
						"63ac6e99-2544-425d-8311-7a3469b43d42"
					]
				}
			},
			"response": []
		},
		{
			"name": "04 -Reports/deleted-percentage",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvZHJpZ29mYXVuZGVzQGFwcGx5ZGlnaXRhbC5jb20iLCJzdWIiOiJBcHBseVRlc3RAMTIzIiwiaWF0IjoxNzM3NTg0NDEwLCJleHAiOjE3Mzc1ODgwMTB9._TznwLkxpqQgA24m0-dlWEXktXHDiYvEIYsO1P-XtVE",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "toDate",
							"value": "2024-12-15",
							"type": "text"
						},
						{
							"key": "fromDate",
							"value": "2024-12-12",
							"type": "text"
						},
						{
							"key": "price",
							"value": "123",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "http://localhost:3000/reports/deleted-percentage",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"reports",
						"deleted-percentage"
					],
					"query": [
						{
							"key": "price",
							"value": "123.1",
							"disabled": true
						},
						{
							"key": "fromDate",
							"value": "2024-12-12",
							"disabled": true
						},
						{
							"key": "toDate",
							"value": "2024-12-15",
							"disabled": true
						},
						{
							"key": "asd",
							"value": "asd",
							"disabled": true
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "04 -Reports/not-deleted-percentage",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MzcwODkxMjksImV4cCI6MTczNzA5MjcyOX0.JWPjWKYM_xJ6--Y3yumHPAsXh3RNXXWXUxN0T6V_u9I",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "toDate",
							"value": "2024-12-15",
							"type": "text"
						},
						{
							"key": "fromDate",
							"value": "2024-12-12",
							"type": "text"
						},
						{
							"key": "price",
							"value": "123",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "http://localhost:3000/reports/not-deleted-percentage?fromDate=2025-01-19&toDate=2025-01-23",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"reports",
						"not-deleted-percentage"
					],
					"query": [
						{
							"key": "price",
							"value": "123.1",
							"disabled": true
						},
						{
							"key": "fromDate",
							"value": "2025-01-19"
						},
						{
							"key": "toDate",
							"value": "2025-01-23"
						},
						{
							"key": "asd",
							"value": "asd",
							"disabled": true
						}
					]
				}
			},
			"response": []
		}
	]
}
```