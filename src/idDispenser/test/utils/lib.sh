colorGreen="\e[32m"
colorDefault="\e[39m"
thisScript=`basename "$0"`
tmpFile=`mktemp`

function invokeLambda {
    function=$1
    payload=$2

    printf "${colorGreen}Invoking:${colorDefault}${function}\n"
    printf "${colorGreen}Payload:${colorDefault}${payload}\n"

    printf "${colorGreen}Response:${colorDefault}"
    aws lambda invoke --function-name "$function" --payload "$payload" "$tmpFile"

    printf "${colorGreen}Body:${colorDefault}"
    cat "$tmpFile"

    rm "$tmpFile"
}