#!/bin/sh

colorGreen="\e[32m"
colorDefault="\e[39m"
thisScript=`basename "$0"`
tmpFile=`mktemp`

if [[ "$#" -lt 1 ]]; then
    echo "Usage: ${thisScript} idtag [stage=dev]"
    exit 1
fi

stage=${2:-dev}
function="awsh-iddispenser-${stage}-dispense"
payload="{ \"idtag\": \"$1\" }"

printf "${colorGreen}Invoking:${colorDefault}${function}\n"
printf "${colorGreen}Payload:${colorDefault}${payload}\n"

printf "${colorGreen}Response:${colorDefault}"
aws lambda invoke --function-name "$function" --payload "$payload" "$tmpFile"

printf "${colorGreen}Body:${colorDefault}"
cat "$tmpFile"

rm "$tmpFile"
