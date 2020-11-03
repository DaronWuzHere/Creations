from PIL import ImageFile, Image
from multiprocessing import Process
from multiprocessing import cpu_count
from multiprocessing import Queue
import sys
import os
import cv2

#########################################################################################################
# Program Parameters
# These can be changed here to improve on processing speed
# Dimensions, being the height and width of the images to be used as tiles in mosaic
TILE_DIM = 50

# Null value
NULL = None	

# The zoom constant that controls the scale of the mosaic compared to the target
ZOOM = 8		

# Used to scale the tile down for easier processing, cannot be one
RES = 5	

# Runnning processes
PROCESSES = max(cpu_count() - 1, 1)

# File to be output in working directory
OUT_FILE = 'mosaic_image.jpeg'

# Use the RES constant to scale the dimensions while keeping it from being scaled by one
NEW_TILE_DIM = TILE_DIM / max(min(RES, TILE_DIM), 1)


#########################################################################################################

class Target:
    # Constructor 
    def __init__(self, target_dir):
        self.target_dir = target_dir

    # Converts the target image to RGB
    def process_target(self):
        print('Processing target image...')
        image = Image.open(self.target_dir)
        width = image.size[0] * ZOOM
        height = image.size[1] * ZOOM
        dim = (width, height)
        
        # Resize the image according to the ZOOM constant
        large_image = image.resize(dim, Image.ANTIALIAS)

        small_dim = (int(width / NEW_TILE_DIM), int(height / NEW_TILE_DIM))
        small_image = large_image.resize(small_dim, Image.ANTIALIAS)

        # Convert it to a tuple that containts the RGB colours
        image_data = (large_image.convert('RGB'), small_image.convert('RGB'))

        print('Processing of target image complete.')

        return image_data

# Utilises multithreading inorder to speed up the configuration of the mosaic
def place_tiles(queue, result, crop_data):
    make_mosaic = MosaicMaker(crop_data)
    while_var = True
    while while_var:
        try:
            img_data, img_location = queue.get(True)
            if img_data == NULL:
                break
            index = make_mosaic.fit_cropped_img(img_data)
            result.put((img_location, index))
        except KeyboardInterrupt:
            pass

    # let the result handler know that this worker has finished everything
    result.put((NULL, NULL))
        


#########################################################################################################
class Tiles:
    # Constructor 
    def __init__(self, image_dir):
        self.image_dir = image_dir

    # Takes the batch of images from the folder, crops them converts them to RBG
    def __process_imgs(self, img_path):
        try:
            image = Image.open(img_path) 
            
            #Images are truncated due to the size of some, being too large to process
            ImageFile.LOAD_TRUNCATED_IMAGES = True
            
            # Input images must be square, so take the smaller of the two and crop it to match
            width = image.size[0]
            height = image.size[1]
            min_dim = min(width, height) 
            
            # Create a larger and smaller image
            large_dim = (TILE_DIM, TILE_DIM)
            small_dim = (int(TILE_DIM/NEW_TILE_DIM), int(TILE_DIM/NEW_TILE_DIM))
    
            # Resize to get the images
            large_image = image.resize(large_dim, Image.ANTIALIAS)
            small_image = image.resize(small_dim, Image.ANTIALIAS)
    
            return (large_image.convert('RGB'), small_image.convert('RGB'))
        except:
            return (NULL, NULL)
            # An empty tuple is returned if the image cannot be used

    # Collect the images to be used in the mosaic from the folders
    def get_tiles(self):
        large_images = []
        small_images = []

        print('Folder {} currently being read...'.format(self.image_dir))

        # Extensively search all the files in the image directory
        # And update user on progress
        for root, subFolders, files in os.walk(self.image_dir):
            for img in files:
                # Prints out the name of each file read
                print('Reading {:40.40}'.format(img), flush=True, end='\r')
                file_path = os.path.join(root, img)
                large_image, small_image = self.__process_imgs(file_path)
                if large_image:
                    large_images.append(large_image)
                    small_images.append(small_image)


        print('A total of {} image files processed.'.format(len(large_images)))

        return (large_images, small_images)
        
#########################################################################################################

# Basically the starting function for the entire program
def mosaic(image_path, tiles_path):
    image_data = Target(image_path).process_target()
    input_data = Tiles(tiles_path).get_tiles()
    create(image_data, input_data)


#########################################################################################################
class MosaicMaker:
    # Constructor
    def __init__(self, crop_data):
        self.crop_data = crop_data

    # Compares images and calculates the difference between the RBG values of the tile 
    # and the specific region of the target image
    def __compare_imgs(self, img1, img2, stop):
        img_diff = 0
        for x in range(len(img1)):
            img_diff += ((img1[x][0] - img2[x][0])**2 + (img1[x][1] - img2[x][1])**2 + (img1[x][2] - img2[x][2])**2)
            if img_diff > stop:
            # If the difference is bigger than the max value, then there is no need to continue
                return img_diff
        return img_diff

    # Determine the best location for the tile in the mosaic image by determining the best possible index
    def fit_cropped_img(self, img_data):
        best_index = 0
        minimum = sys.maxsize
        index = 0
        
        for tile_data in self.crop_data:
            diff = self.__compare_imgs(img_data, tile_data, minimum)
            if diff < minimum:
                minimum = diff
                best_index = index
            index = index + 1
        return best_index


#########################################################################################################

# A simple class that tracks the progress of the mosaic in percent completed
class Progress:
    def __init__(self, total):
        self.total = total
        self.updated = 0

    def update(self):
        self.updated += 1
        print("Progress: {:04.1f}%".format(100 * self.updated / self.total), flush=True, end='\r')
        

#########################################################################################################

class MosaicImage:
    # Constructor
    def __init__(self, original):
        self.image = Image.new(original.mode, original.size)
        self.x_count = int(original.size[0] / TILE_DIM)
        self.y_count = int(original.size[1] / TILE_DIM)
        self.total_tiles  = self.x_count * self.y_count

    # Use paste from the python image library to put the tiles together to make the mosaic
    def add_img(self, tile_data, location):
        image = Image.new('RGB', (TILE_DIM, TILE_DIM))
        image.putdata(tile_data)
        self.image.paste(image, location)

    # Saves the image in the directory given 
    def save(self, final_path):
        self.image.save(final_path)

#########################################################################################################
# Build the mosaic using processes 
def build_mosaic(result, total_large, large_original):
    mosaic = MosaicImage(large_original)
    
    running_processes = PROCESSES
    while True:
        try:
            img_location, best_index = result.get()
            
            if img_location == NULL:
                running_processes -= 1
                if not running_processes:
                    break
            else:
                tile_data = total_large[best_index]
                mosaic.add_img(tile_data, img_location)

        except KeyboardInterrupt:
            pass

    
    mosaic.save(OUT_FILE)
    im = Image.open(OUT_FILE)
    im.show()
    print('\nFinished, output is in\n', OUT_FILE)

#########################################################################################################

# Primary function that handles the target image and the folder of given images
def create(original_image, all_tiles):
    print('Creating your mosaic...')
    large_original, small_orginal = original_image
    large_tiles, small_tiles = all_tiles

    mosaic = MosaicImage(large_original)

    total_large = [list(tiles.getdata()) for tiles in large_tiles]
    total_small = [list(tiles.getdata()) for tiles in small_tiles]

    queue   = Queue(PROCESSES)	
    result = Queue()

    try:
        # This begins the process that builds the mosaic
        Process(target = build_mosaic, args = (result, total_large, large_original)).start()

        # This starts the processes that put the tiles together
        for x in range(PROCESSES):
            Process(target = place_tiles, args=(queue, result, total_small)).start()

        # Keep track of the progress of the mosaic
        completed = Progress(mosaic.x_count * mosaic.y_count)
        for x in range(mosaic.x_count):
            for y in range(mosaic.y_count):
                large_set = (x * TILE_DIM, y * TILE_DIM, (x + 1) * TILE_DIM, (y + 1) * TILE_DIM)
                small_set = (x * TILE_DIM/NEW_TILE_DIM, y * TILE_DIM/NEW_TILE_DIM, (x + 1) * TILE_DIM/NEW_TILE_DIM, (y + 1) * TILE_DIM/NEW_TILE_DIM)
                queue.put((list(small_orginal.crop(small_set).getdata()), large_set))
                
                completed.update()

    finally:
        # End the processes by sending them null values
        for n in range(PROCESSES):
            queue.put((NULL, NULL))


#########################################################################################################

# The actual starting point for the program
# Only runs once
if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: {} <image> <tiles directory>\r'.format(sys.argv[0]))
        sys.exit()
    
    print("Variables can be editied by changing the values within the program in a text editor\n")
    print("Visit the top of the program file for the variables\n")
    condition = str(input("Resize image for faster processing? (yes or no)\n"))
    if (condition == "yes"):
        original = Image.open(sys.argv[1])
        new = original.copy()
        original = original.save("original.jpg")
        
        print("Image will be resized\n")
        print("Original image will be renamed original.jpg\n")
        scale = float(input("Enter the desired scale, decimals recommended\n"))
        
        height = new.size[1]
        width = new.size[0]
    
        height = int(height - (height * scale)) 
        width = int(width - (width * scale))
        
        dim = (width, height)
        new = new.resize(dim)
        
        new = new.save(sys.argv[1])
    
    mosaic(sys.argv[1], sys.argv[2])   
    


