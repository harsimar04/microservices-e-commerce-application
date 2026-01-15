output "public_subnet_ids" {
  value = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  value = aws_subnet.private[*].id
}
output "eks_cluster_name" {
  value = aws_eks_cluster.this.name
}

