# PERDIDOGS

## MongoDB Docker Container

```shell
docker run -p 27017:27017 --name perdidogs-mongo mongo:latest
```

Run `mongosh` shell:
```shell
docker exec -it perdidogs-mongo mongosh
```
