#!/bin/sh

. ./lib.sh

if [[ "$#" -lt 1 ]]; then
    echo "Usage: ${thisScript} idtag [stage=dev]"
    exit 1
fi

stage=${2:-dev}
function="awsh-iddispenser-${stage}-dispense"
payload="{ \"idtag\": \"$1\" }"

invokeLambda "${function}" "${payload}"