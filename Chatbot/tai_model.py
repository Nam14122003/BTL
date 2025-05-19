from huggingface_hub import snapshot_download

snapshot_download(repo_id="vilm/vinallama-7b-chat", cache_dir="./Model")
