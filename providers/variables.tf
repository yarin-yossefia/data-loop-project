variable "project_id" {
  description = "Google Cloud project ID"
  type        = string
  default     = "dataloop-project-463316"    
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "GCP zone"
  type        = string
  default     = "us-central1-a"
}
