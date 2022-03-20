# Ingress

## Certificate management

```shell
# Add helm repository
helm repo add jetstack https://charts.jetstack.io
# Update helm repositories
helm repo update
# Install cert-manager
helm upgrade cert-manager jetstack/cert-manager \
  --install \
  --namespace system-cert-manager \
  --create-namespace \
  --version v1.7.1 \
  --set installCRDs=true
```
