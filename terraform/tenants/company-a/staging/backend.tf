terraform {
  backend "gcs" {
    bucket  = "dataloop-project-terraform-state-files"
    prefix  = "company-a/staging"
  }
}
