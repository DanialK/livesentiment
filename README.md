#### To train and export models

1. `clone` this repository and `cd` into it
1. `pip install virtualenv`
1. `virtualenv ENV`
1. `source ENV/bin/activate`
1. `pip install -r requirements.txt`
1. run `jupyter notebook` in this directory and open `model_train.ipynb`

* If you are training the model:
  * GloVe embeddings are needed and the download link is provided in the Notebook. Unzip the embeddings in `embeddings/`
  * Download the Yelp Dataset (JSON) from the link provided in the Notebook and place `review.json` in `data/`

* All the trained models and outputs can be found in `output/`


#### To run the Web Application see `web/README.md`

#### To run the IOS Application see `mobile/README.md`


PS. I didn't bother with the Android App after getting IOS and Web working, but if anyone sends a PR I'd be glad to merge.

