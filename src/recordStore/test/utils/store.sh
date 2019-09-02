#!/bin/sh

. ./lib.sh

if [[ "$#" -lt 2 ]]; then
    echo "Usage: ${thisScript} did jid [stage=dev]"
    exit 1
fi

stage=${3:-dev}
function="awsh-recordstore-${stage}-store"
payload="{ \"did\": \"$1\", \"jid\": \"$2\", \"payload\": { \"version\": 1, \"timestamp\": 1234567, \"type\": \"temp\", \"value\": \"12\" }}"

invokeLambda "${function}" "${payload}"