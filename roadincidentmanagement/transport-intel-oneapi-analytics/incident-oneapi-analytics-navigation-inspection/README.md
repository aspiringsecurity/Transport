# Intel oneapi powered analytics, navigation and inspection using UAVs and drones using NXP iot modular gateway

We are extending the example of navigation and inspection using drones to enable local air traffic control, detecting and managing drones and setting up geo-fences, communication setup for drones using predictive analytics and automation. Please visit: https://github.com/aspiringsecurity/Transport/tree/main/roadincidentmanagement/transport-intel-oneapi-analytics/incident-oneapi-analytics-navigation-inspection 


Features:

•Detection : Identifying the drones & UAVs in the video feed using object detection.

•Discovery : Logging the identities of the drones & UAVs flying in a particular air space at any instant of time, using exchange of unique identifiers.

•Geo-fencing : Discovering unlawful presence and raising alarms using the detection & discovery data.

•Monitoring : Looking out and reporting incidents based on event detection in visual data.

•Analysis : Analyzing route patterns and incidents.

•Drone Incident Reporting : Publish drone incident reports.


# Creating the execution environment

Dataset preparation
Training VGG-UNET model
Model Inference
Quantize trained models using Intel® Neural Compressor and benchmarking
Observations


# Software Requirements
Package	Stock Python
Python	Python=3.9.7
TensorFlow	TensorFlow==2.8.0
Intel® Neural Compressor	NA

# Environment
Below are the developer environment used for this module on Azure. All the observations captured are based on these environment setup.

Size	CPU Cores	Memory	Intel® CPU Family
Standard_D8_Vs5	8	32GB	ICELAKE
Solution setup
The below file is used to create an environment as follows:

YAML file	Environment Name	Configuration
env/stock/drone-stock.yml	drone-stock	Python=3.9.7 with stock TensorFlow 2.8.0


# Dataset

Pixel-accurate annotation for Drone Dataset focuses on semantic understanding of urban scenes for increasing the safety of Drone landing procedures. The imagery depicts more than 20 houses from nadir (bird's eye) view acquired at an altitude of 5 to 30 meters above ground. A high resolution camera was used to acquire images at a size of 6000x4000px (24Mpx). The complexity of the dataset is limited to 20 classes and the target output is paved area class. The training set contains 320 publicly available images, and the test set is made up of 80 images. Here the train & test dataset split is 80:20.

Source: https://www.kaggle.com/datasets/bulentsiyah/semantic-drone-dataset


# Training

VGG-UNET is a segmentation based convolutional neural network , a segmentation architecture to segment the Paved Area and other classes from the environment. Stock TensorFlow v2.8.0 is used for transfer learning the VGG-UNET segmentation architecture on the semantic drone dataset which has been downloaded and been preprocessed using OpenCV & NumPy.


# Inference

Performed inferencing on the trained model using Stock TensorFlow v2.8.0.

# Environment Creation
Setting up the environment for Stock TensorFlow
Follow the below conda installation commands to setup the Stock TensorFlow environment for the model training and prediction.

conda env create -f env/stock/drone-stock.yml
Activate stock conda environment Use the following command to activate the environment that was created:

conda activate drone-stock

# Data preparation
The Aerial Semantic Segmentation Drone Dataset is downloaded and extracted in a folder before running the training python module.

Folder structure Looks as below after extraction of dataset.

- Aerial_Semantic_Segmentation_Drone_Dataset
    - dataset
        - semantic_drone_dataset
            - label_images_semantic
            - original_images
    - RGB_color_image_masks
    
Note: For instructions to download the dataset, refer the data.txt file inside the data folder.

Now the data folder contains the below structure
data="data/Aerial_Semantic_Segmentation_Drone_Dataset/dataset/semantic_drone_dataset/"

# Training VGG-UNET model
Run the training module as given below to start training and prediction on validation dataset (a sample of data held back from training your model that is used to give an estimate of model skill) using the active environment.

# Hyperparameter_tuning
Transfer learning was performed as part of default training with the best possible parameters led to considerable drop in Categorial cross-entropy loss.Later trained models are used as a starting point for hyperparameter tuning to boost performance. The parameter search space is confined to the few parameters listed below, however users can utilize this reference implementation to improve the model's performance



