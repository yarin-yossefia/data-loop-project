module "gke" {
  source       = "../../../terraform/modules/gke"
  project_id   = var.project_id
  cluster_name = var.cluster_name
  location     = var.region
  machine_type = var.machine_type
} 
