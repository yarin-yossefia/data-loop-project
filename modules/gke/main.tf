resource "google_container_cluster" "gke_cluster" {
  name     = var.cluster_name
  location = var.location
  project  = var.project_id

  initial_node_count = 1

  node_config {
    machine_type = var.machine_type
    disk_type    = "pd-standard"
    disk_size_gb = 50

    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",        # כתיבה ל-Cloud Logging
      "https://www.googleapis.com/auth/monitoring.write"      # כתיבה ל-Cloud Monitoring
    ]
  }
}
