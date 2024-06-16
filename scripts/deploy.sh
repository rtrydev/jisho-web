set -xe

npm run build:prod
aws s3 cp dist/jisho-web/browser/ s3://jisho.rtrydev.com/ --recursive
aws cloudfront create-invalidation --distribution-id E3SFCD6D47W447 --paths "/*"