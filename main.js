status = "";
objects = [];



function setup()
{
    canvas = createCanvas(640,600);
    canvas.position(650,400);

    video = createCapture(VIDEO);
    video.size(640,600);
    video.hide();

}

function start()
{ 
    object_name = document.getElementById("object_name").value;    
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects"
    
    
}

function modelLoaded()
{
    console.log("The Model Is Loaded!!!!!!!");
    status = true;

}


function gotResult(error, results)
{
   if(error)
   {
       console.error(error);
   }
   
   console.log(results);
   objects = results;

}



function draw()
{
    
    image(video,0,0,640,600);

  if(status != "")
   {
    objectDetector.detect(video, gotResult);
       for(i = 0; i < objects.length; i++)
       {
         document.getElementById("status").innerHTML = "Status : Object Detected";
 
  
        
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[0].x, objects[0].y, objects[0].width, objects[0].height);


  
           if(objects[i] == object_name)
           {
                status = "Object Found";
                document.getElementById("status").innerHTML = "Object Found";
                video.stop();
            }

       }
   }
}