# Kubernetes ingress
![ingress](./resources/ingress.png)
## Basic auth

[Documentation](https://kubernetes.github.io/ingress-nginx/examples/auth/basic/)

```yaml
username: cc-user
password: 1234
```

### Create credentials
```shell
htpasswd -c auth cc-user
...
```

### Create secret from credentials
```shell
kubectl create secret generic cc-credentials \
--namespace caen-camp \
--from-file=auth
```

### Apply basic auth to an ingress
```yaml
nginx.ingress.kubernetes.io/auth-type: basic
nginx.ingress.kubernetes.io/auth-secret: cc-credentials
```


