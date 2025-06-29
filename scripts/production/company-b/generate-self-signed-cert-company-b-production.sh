#!/bin/bash

DOMAIN="dataloopwebapp-company-b.com"
SECRET_NAME="frontend-tls-company-b-production-secret"
NAMESPACE="services"

echo "Generating self-signed certificate for: $DOMAIN"

openssl genrsa -out tls.key 2048

openssl req -new -key tls.key -out tls.csr -subj "/CN=$DOMAIN/O=MyOrg"

openssl x509 -req -days 365 -in tls.csr -signkey tls.key -out tls.crt

echo "Certificate (tls.crt) and private key (tls.key) created."

echo "Creating Kubernetes TLS Secret '$SECRET_NAME' in namespace '$NAMESPACE'..."
kubectl create secret tls "$SECRET_NAME" --cert=tls.crt --key=tls.key -n "$NAMESPACE"

echo "Cleanup: Removing local certificate files (tls.key, tls.csr, tls.crt)."
rm tls.key tls.csr tls.crt

echo "Self-signed certificate setup complete." 
