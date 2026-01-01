#!/bin/bash

# Set Project ID
PROJECT_ID="gen-lang-client-0792008363"

# Add gcloud to PATH
export PATH=/usr/local/share/google-cloud-sdk/bin:$PATH

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
  echo "Error: gcloud CLI is not installed. Please install it first."
  exit 1
fi

echo "Setting project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

echo "Enabling necessary APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com

echo "Submitting build to Cloud Build..."
gcloud builds submit --config cloudbuild.yaml .

echo "Deployment submitted. Check the build logs in the Google Cloud Console."
