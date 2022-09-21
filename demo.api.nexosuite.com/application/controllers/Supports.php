<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Supports extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('api_model');
		$this->load->model('supports_model');
		$this->load->helper('url');
		$this->load->helper('text');
        $this->load->helper('api');

	}



	public function products_by_client($id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		if($isValidToken) {

		$items = $this->supports_model->get_products_by_client($id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'title' => $item->title,
					'description' => $item->description,
					'description_full' => $item->description_full,
					'works_id' => $item->works_id,
					'category_id' => $item->category_id,
					'brand_id' => $item->brand_id,
					'is_active' => $item->is_active,
					'location_id' => $item->location_id,
					'status' => $item->status,
					'code' => $item->code,
					'code_int' => $item->code_int,
					'image' => base_url('media/images/'.$item->image),
					'created_at' => $item->created_at

				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($posts));
	}
}




public function tickets_support_id($id, $user_id)
	{
		$category_name = $this->input->get('name');
		$category_description = $this->input->get('description');

		$size = $this->supports_model->count_tickets_support_id($category_name, $category_description, $user_id, $id);
     
		header("Access-Control-Allow-Origin: *");
		header( "size: $size", TRUE );		
		//header( "x-total-count: $size", TRUE );	
		header( "Connection: Keep-Alive" );	
		header("Access-Control-Allow-Headers: authorization, Content-Type, size, x-total-count");
		header("Access-Control-Request-Headers: GET, POST, PUT");
		header("Access-Control-Expose-Headers: x-total-count");


		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

				$_start = $this->input->get('_start');
				$_limit = $this->input->get('_limit');
				$_sort = $this->input->get('_sort');
				//$code = $this->input->get('code');
				//$code_int = $this->input->get('code_int');
				$category_name = $this->input->get('name');
				$category_description = $this->input->get('description');

				//$works_id = $this->input->get('works_id');
				//$category_id = $this->input->get('category_id');
                
				if ($_limit !== NULL && $_limit > 100)
				{
					$_limit = 100;
				}

                if ($_start !== NULL && $_start > 0)
				{
					$_start =$_start*$_limit;
				}



			$posts = array();

			
			if($isValidToken) {

			$blogs = $this->supports_model->get_tickets_support_id($user_id, $id, $_start, $_limit, $_sort, $category_name, $category_description);

			foreach($blogs as $blog) {

				
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'date' => $blog->created_at,
					'message' => $blog->message,
					'user_id' => $blog->user_id,
					'ref_id' => $blog->ref_id,
					'phone' => $blog->phone,
					'is_active' => $blog->is_active,

					'status' => $blog->status,
					'sender_id' => $blog->sender_id,
				);
			}
			$total=count($posts);
			header( "size: $total", TRUE );			
			header( "x-total-count: $size", TRUE );	
			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		
			}


	}






	public function count($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $id);

		if($isValidToken) {

			$posts = $this->supports_model->count_supports($id);
	
		}
	}


	public function index()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->supports_model->get_products();
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'description' => $blog->description,
					'description_full' => $blog->description_full,
					'works_id' => $blog->works_id,
					'category_id' => $blog->category_id,
					'brand_id' => $blog->brand_id,
					'location_id' => $blog->location_id,
					'code' => $blog->code,
					'code_int' => $blog->code_int,
					'status' => $blog->status,
					'sender_id' => $blog->sender_id,
					'is_active' => $blog->is_active,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at

				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		}
	}




public function list_user($user_id)
	{
		$category_name = $this->input->get('name');
		$category_description = $this->input->get('description');

		$size = $this->supports_model->count_supports_search($category_name, $category_description, $user_id);
     
		header("Access-Control-Allow-Origin: *");
		header( "size: $size", TRUE );		
		//header( "x-total-count: $size", TRUE );	
		header( "Connection: Keep-Alive" );	
		header("Access-Control-Allow-Headers: authorization, Content-Type, size, x-total-count");
		header("Access-Control-Request-Headers: GET, POST, PUT");
		header("Access-Control-Expose-Headers: x-total-count");


		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

				$_start = $this->input->get('_start');
				$_limit = $this->input->get('_limit');
				$_sort = $this->input->get('_sort');
				//$code = $this->input->get('code');
				//$code_int = $this->input->get('code_int');
				$category_name = $this->input->get('name');
				$category_description = $this->input->get('description');

				//$works_id = $this->input->get('works_id');
				//$category_id = $this->input->get('category_id');
                
				if ($_limit !== NULL && $_limit > 100)
				{
					$_limit = 100;
				}

                if ($_start !== NULL && $_start > 0)
				{
					$_start =$_start*$_limit;
				}



			$posts = array();

			
			if($isValidToken) {

			$blogs = $this->supports_model->get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description);

			foreach($blogs as $blog) {

				
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'date' => $blog->created_at,
					'message' => $blog->message,
					'user_id' => $blog->user_id,
					'ref_id' => $blog->ref_id,
					'phone' => $blog->phone,
					'is_active' => $blog->is_active,

					'status' => $blog->status,
					'sender_id' => $blog->sender_id,
				);
			}
			$total=count($posts);
			header( "size: $total", TRUE );			
			header( "x-total-count: $size", TRUE );	
			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		
			}


	}


public function user($user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->supports_model->get_tickets($user_id);
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'date' => $blog->created_at,
					'message' => $blog->message,
					'user_id' => $blog->user_id,
					'ref_id' => $blog->ref_id,
					'phone' => $blog->phone,
					'is_active' => $blog->is_active,

					'status' => $blog->status,
					'sender_id' => $blog->sender_id,

				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		}
	}



	public function today()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');


		$isValidToken = $this->api_model->checkToken($token);

		$posts = array();
		if($isValidToken) {

			$blogs = $this->supports_model->get_products_date();
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'description' => $blog->description,
					'description_full' => $blog->description_full,
					'works_id' => $blog->works_id,
					'category_id' => $blog->category_id,
					'brand_id' => $blog->brand_id,
					'location_id' => $blog->location_id,
					'code' => $blog->code,
					'code_int' => $blog->code_int,
					'status' => $blog->status,
					'user_id' => $blog->user_id,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at

				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		
			}
		}



public function active($user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->supports_model->get_tickets_active($user_id);
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'date' => $blog->created_at,
					'message' => $blog->message,
					'user_id' => $blog->user_id,
					'ref_id' => $blog->ref_id,
					'phone' => $blog->phone,
					'is_active' => $blog->is_active,
					'status' => $blog->status,
					'sender_id' => $blog->sender_id,

				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		}
	}
	
	
	public function calendar()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->supports_model->get_products_calendar();
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'description' => $blog->description,
					'description_full' => $blog->description_full,
					'works_id' => $blog->works_id,
					'category_id' => $blog->category_id,
					'brand_id' => $blog->brand_id,
					'location_id' => $blog->location_id,
					'code' => $blog->code,
					'status' => $blog->status,
					'code_int' => $blog->code_int,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at

				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		}
	}

	public function id($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->supports_model->get_id($id);

			$post = array(
				'id' => $blog->id,
					'title' => $blog->title,
					'date' => $blog->created_at,
					'message' => $blog->message,
					'user_id' => $blog->user_id,
					'email' => $blog->email,
					'phone' => $blog->phone,
					'name' => $blog->name,
					'ref_id' => $blog->ref_id,
					'status' => $blog->status,
					'sender_id' => $blog->sender_id,
					'is_active' => $blog->is_active,


			);
			

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($post)); 
		}
	}

	
	public function skills($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->supports_model->get_id($id);

			$post = array(			
				$blog->skills
			);
			

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output($blog->skills); 
		}
	}


	public function products_data($id, $user_id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		//$isValidToken = $this->api_model->checkToken($token);


		$items = $this->supports_model->get_products_data($id, $user_id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){

				$posts[] = array(
					'id' => $item->id,
					'title' => $item->title,
					'description' => $item->description,
					'description_full' => $item->description_full,
					'product_id' => $item->product_id,
					'user_id' => $item->user_id,
					'image' => base_url('media/images/'.$item->image),
					'created_at' => $item->created_at

				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($posts));
	
	}




public function create($user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$title = $this->input->post('title');
			$message = $this->input->post('message');
			$user_id = $this->input->post('user_id');
			$phone = $this->input->post('phone');
			$ref_id = $this->input->post('ref_id');
			$email = $this->input->post('email');
			$name = $this->input->post('name');
			$sender_id = $this->input->post('sender_id');



			$filename = NULL;

			$isUploadError = FALSE;

			if ($_FILES && $_FILES['image']['name']) {

				$config['upload_path']          = './media/images/';
	            $config['allowed_types']        = 'gif|jpg|png|jpeg';
	            $config['max_size']             = 500;

	            $this->load->library('upload', $config);
	            if ( ! $this->upload->do_upload('image')) {

	            	$isUploadError = TRUE;

					$response = array(
						'status' => 'error',
						'message' => $this->upload->display_errors()
					);
	            }
	            else {
	            	$uploadData = $this->upload->data();
            		$filename = $uploadData['file_name'];
	            }
			}

			if( ! $isUploadError) {
	        	$blogData = array(
				'title' => $title,
					'user_id' => $user_id,
					'message' => $message,
					'name' => $name,
					'title' => $title,
					'sender_id' => $sender_id,
					'phone' => $phone,
					'email' => $email,
					'is_active' => 1,
					'ref_id' => $ref_id,
					'created_at' => date('Y-m-d H:i:s', time())
				);

				$id = $this->supports_model->create($blogData);


				$response = array(
					'status' => 'success'
				);

				$this->sendemail($blogData);

			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($response)); 
		}
	}


	public function sendemail($blogData)
	{
		$message = ' <html>
	       <head>
	         <title>your title</title>
	       </head>
	       <body style="background-color: #efefef">
		   	<div style="background-color: #efefef; padding: 50px;">
		   	<div class="wrapper" style="width: 600px; margin: 0 auto; padding: 30px; background-color: #FFF">
	         <h2 style="color: #377dff">Hi, <br />Some one has submitted contact form.</h2>
	        <p style="color: #282d35;"><strong>Name: </strong>'.$blogData['name'].'</p>
			<p style="color: #282d35;"><strong>Email: </strong>'.$blogData['email'].'</p>
			<p style="color: #282d35;"><strong>Phone: </strong>'.$blogData['phone'].'</p>
			<p style="color: #282d35;"><strong>Name: </strong>'.$blogData['message'].'</p>	
			 </div>
			 </div>
	       </body>
	     </html>';
	

		$this->load->library('email');

		$config['protocol']    = 'smtp';
			$config['smtp_host']    = 'mail.startupinspire.com';
			$config['smtp_port']    = '587';
			//$config['smtp_timeout'] = '7';
			$config['smtp_user']    = 'support@startupinspire.com';
			$config['smtp_pass']    = 'hA!1gee]4gVV';
			$config['charset']    = 'utf-8';
			$config['newline']    = "\r\n";
			$config['mailtype'] = 'html'; // or html
			$config['charset'] = 'iso-8859-1'; // or html
			$config['validation'] = TRUE; // bool whether to validate email or not



		$this->email->initialize($config);

		$this->email->from('support@startupinspire.com', 'Matthias Gutsch');
		$this->email->to($blogData['email']);
		$this->email->bcc('hello@startupinspire.com', 'Support Desk');
		/*$this->email->bcc('them@rsgitech.com');*/

		$this->email->subject('Ticket Support '.$blogData['name'].'' );
		$this->email->message($message);

		$this->email->send();
	}



	public function update($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->supports_model->get_id($id);

			$is_active = $this->input->post('is_active');
			


			$isUploadError = FALSE;

			

			if( ! $isUploadError) {
	        	$blogData = array(
					'is_active' => $is_active,

				);

				$this->supports_model->update($id, $blogData);

				$response = array(
					'status' => 'success'
				);
           	}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($response)); 
		}
	}


	
	public function delete($id, $user_id)
	{
		header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->supports_model->get_id($id);

			
			$this->supports_model->delete($id);

			$response = array(
				'status' => 'success'
			);

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($response)); 
		}
	}

}