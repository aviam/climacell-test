# Climacell-Exercise

# Service url
  
http://34.77.248.238:3000/users

## GKE private cluster

- Attached service account file to connect my private cluster let me know if there is an issue with that.
  * `gcloud auth activate-service-account --key-file climacelltest.json`
  * `gcloud beta container clusters get-credentials climacell-test --region europe-west1 --project inbound-lattice-237414`

- namespaces:
   * stage: for climacell service
   * datadoc: monitoring http health with data dog agents.
   * cd: for jenkins CI/CD tool.

## Peering vpc between atlas and GCP project default vpc

- Mongodb connection string saved as secret in cluster  
   * helm-chart->templates->mongourl-secret.yaml.
   * there are more better option to save credentials such as base64 encode before or vault..  

## CI/CD

- Jenkins- deployed into cd namespace with official jenkins helm chart.

- <http://34.76.47.108:8080/>
  * user: climacell
  * password: 1q2w3e4r
- You can see there devops-challenge jenkins pipeline job which build docker image push it to gcr and and deployed it my private cluster with helm command.
  here you can see ***Dockerfile*** and ***Jenkinsfile*** for building and deploying the servive to gcr and gke as well.

  * pipeline: build image -> push image to gcr-> helm deploy to gke.

## Monitoring

- Installed datadog agent in my cluster with value file: datadog-values.yaml
  * `helm ugrdae --install -f datadog-values.yaml datadog --namespace datadog`
  * defined confd http_check for service health check
  * defined api-key to connect my datadog account
  * defined site and url to europe where my agent deployed in k8s cluster zone.

  ** sent you invitaion to https://app.datadoghq.eu/ you can see there sample dashbord based on http_check metric from agent, monitoring http://34.77.248.238:3000/health.

# Notes

- Jenkins and climacell k8s Services defined as LB type just for the fast solution, in real it should be behind LB ( above k8s ngnix controller) with domain and certificates or with other gateway solution.

- DB Secret can be more secure...

- Dockerfile should implemented more efficiencly with multi stage build.

- Monitoring with datadog is simple only to illustrate the flow...

- Put everything in same cluster only for the challenge.
