variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "cluster_name" {
  description = "Name of the GKE Cluster"
  type        = string
}

variable "location" {
  description = "Region or Zone for the GKE Cluster"
  type        = string
}

variable "machine_type" {
  description = "Machine type for the GKE nodes"
  type        = string
  default     = "e2-medium"
}
