# dangerous-pets

This is a simple pet store sample project for examples in the [Loadster Manual](https://loadster.com/manual/).
It's implemented as a simple Node/Express API combined with a Vue frontend. It stores sessions and user
accounts in memory for now, so they will get blown away from time to time when the pet store restarts.

If you'd like to run your own instance for load testing practice or whatever, you can pull down the
Docker image.

```
$ docker pull quay.io/loadster/dangerous-pets
$ docker run -it -p3001:3001 quay.io/loadster/dangerous-pets
```

You can then view it in your browser at http://localhost:3001.

The live pet store is usually running at https://petstore.loadster.com.
