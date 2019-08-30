#!/bin/sh

colorGreen="\e[32m"
colorDefault="\e[39m"
thisScript=`basename "$0"`
tmpFile=`mktemp`

if [[ "$#" -lt 2 ]]; then
    echo "Usage: ${thisScript} idtag encoded [stage=dev]"
    exit 1
fi

stage=${3:-dev}
function="awsh-iddispenser-${stage}-decode"
payload="{ \"idtag\": \"$1\", \"encoded\": \"$2\" }"

printf "${colorGreen}Invoking:${colorDefault}${function}\n"
printf "${colorGreen}Payload:${colorDefault}${payload}\n"

printf "${colorGreen}Response:${colorDefault}"
aws lambda invoke --function-name "$function" --payload "$payload" "$tmpFile"

printf "${colorGreen}Body:${colorDefault}"
cat "$tmpFile"

rm "$tmpFile"
