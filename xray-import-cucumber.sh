FEATURES_FILE_PATH=all.feature
PROJECT_KEY="$1"

# Input variables validation
if [ "$PROJECT_KEY" == "" ]; then
    echo "PROJECT_KEY missing. Usage: /xray-api-upload-cucumber-report.sh <PROJECT_KEY>"
    exit 1 
fi
if [ "$XRAY_CLIENT_ID" == "" ]; then 
    echo "XRAY_CLIENT_ID env var is empty" exit 1
fi
if [ "$XRAY_CLIENT_SECRET" == "" ]; then
    echo "XRAY_CLIENT_SECRET env var is empty" 
    exit 1 
fi 
if [ ! -f $FEATURES_FILE_PATH ]; then echo "No features file found at $FEATURES_FILE_PATH" 
    exit 1
fi

#Precalculations
token=$(curl -H "Content-Type: application/json" -X POST --data "{ \"client_id\": \"$XRAY_CLIENT_ID\",\"client_secret\": \"$XRAY_CLIENT_SECRET\" }" https://xray.cloud.getxray.app/api/v2/authenticate| tr -d '"')

curl -H "Content-Type: multipart/form-data" -X POST -F "file=@${FEATURES_FILE_PATH}" -H "Authorization: Bearer ${token}" https://xray.cloud.getxray.app/api/v1/import/feature?projectKey=$PROJECT_KEY > output.text
cat output.text


