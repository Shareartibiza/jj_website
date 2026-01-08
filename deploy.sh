#!/bin/bash

# Exit on any error
set -e

# Set Project ID
PROJECT_ID="gen-lang-client-0792008363"

# Check for gcloud in common locations if not in PATH
if ! command -v gcloud &> /dev/null; then
  export PATH="/usr/local/bin:/usr/local/share/google-cloud-sdk/bin:$PATH"
fi

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
  echo "Error: gcloud CLI is not found. Please install it or update your PATH."
  exit 1
fi

echo "Setting project to $PROJECT_ID..."
gcloud config set project "$PROJECT_ID" --quiet

echo "Enabling necessary APIs..."
gcloud services enable cloudbuild.googleapis.com --quiet
gcloud services enable run.googleapis.com --quiet
gcloud services enable artifactregistry.googleapis.com --quiet

echo "Submitting build to Cloud Build..."
# Note: Ensure you are logged in (gcloud auth login)
gcloud builds submit --config cloudbuild.yaml . --quiet

echo "Deployment submitted. Check the build logs in the Google Cloud Console."

