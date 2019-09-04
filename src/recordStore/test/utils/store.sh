#!/bin/sh

. ./lib.sh

if [[ "$#" -lt 3 ]]; then
    echo "Usage: ${thisScript} gid did jid [stage=dev]"
    exit 1
fi

stage=${4:-dev}
function="awsh-recordstore-${stage}-store"
payload="{ \"gid\": \"$1\", \"did\": \"$2\", \"jid\": \"$3\", \"payload\": { \"version\": 1, \"timestamp\": 1234567, \"type\": \"temp\", \"value\": \"12\" }}"

invokeLambda "${function}" "${payload}"