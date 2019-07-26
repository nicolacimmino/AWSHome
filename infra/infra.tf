provider "aws" {
  version = "~> 2.0"
  region = "eu-west-2"
}

resource "aws_kinesis_stream" "test_stream" {
  name             = "terraform-kinesis-test"
  shard_count      = 1
  retention_period = 24

  tags = {
    Environment = "test"
  }
}
