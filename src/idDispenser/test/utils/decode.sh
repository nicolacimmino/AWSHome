#!/bin/sh

. ./lib.sh

if [[ "$#" -lt 2 ]]; then
    echo "Usage: ${thisScript} idtag encoded [stage=dev]"
    exit 1
fi

stage=${3:-dev}
function="awsh-iddispenser-${stage}-decode"
payload="{ \"idtag\": \"$1\", \"encoded\": \"$2\" }"

invokeLambda "${function}" "${payload}"