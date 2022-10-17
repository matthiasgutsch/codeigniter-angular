<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Shop_orders extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('api_model');
		$this->load->model('shop_orders_model');
		$this->load->model('clients_model');
		$this->load->helper('url');
		$this->load->helper('text');
        $this->load->helper('api');

	}



	


	public function orders_by_client($id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		//$isValidToken = $this->api_model->checkToken($token, $user_id);


		$items = $this->shop_orders_model->get_orders_by_client($id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'title' => $item->title,
					'description' => $item->description,
					'category_id' => $item->category_id,
					'appointment_id' => $item->appointment_id,
					'date' => $item->date,
					'image' => base_url('media/images/'.$item->image),
					'created_at' => $item->created_at

				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($posts));
	


}




	public function count($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

			$posts = $this->shop_orders_model->count_orders($id);
	
		
	}



	public function count_total($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$posts = $this->shop_orders_model->count_total_orders($id);

		
		
	}



public function orders_by_appointment_id($user_id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);


		$items = $this->shop_orders_model->get_orders_by_appointment_id($user_id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'title' => $item->title,
					'description' => $item->description,
					'category_id' => $item->category_id,
					'appointment_id' => $item->appointment_id,
					'date' => $item->date,
					'image' => base_url('media/images/'.$item->image),
					'created_at' => $item->created_at

				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($posts));
	


}



public function orders_by_appointments($user_id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);


		$items = $this->shop_orders_model->get_orders_by_appointments($user_id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'title' => $item->title,
					'description' => $item->description,
					'category_id' => $item->category_id,
					'appointment_id' => $item->appointment_id,
					'date' => $item->date,
					'image' => base_url('media/images/'.$item->image),
					'created_at' => $item->created_at

				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($posts));
	
}


	public function index()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->shop_orders_model->get_orders();
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'description' => $blog->description,
					'category_id' => $blog->category_id,
					'appointment_id' => $blog->appointment_id,
					'date' => $blog->date,
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

		$size = $this->shop_orders_model->count_shop_orders_search($category_name, $category_description, $user_id);
     
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


			$blogs = $this->shop_orders_model->get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description);

			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'name' => $blog->name,
					'address' => $blog->address,
					'zip' => $blog->zip,

					'skills' => $blog->skills,
					'total' => $blog->total,
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



public function user($user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->shop_orders_model->get_orders($user_id);
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'description' => $blog->description,
					'category_id' => $blog->category_id,
					'appointment_id' => $blog->appointment_id,
					'client' => $this->clients_model->get_id($blog->category_id),
					'date' => $blog->date,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at,
					'skills' => $blog->skills,
					'total' => $blog->total,
					'vat' => $blog->vat,
					'subtotal' => $blog->subtotal,

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



			$blog = $this->shop_orders_model->get_id($id);

			$post = array(
				'id' => $blog->id,
				'name' => $blog->name,
				'address' => $blog->address,
				'zip' => $blog->zip,
				'skills' => $blog->skills,
				'total' => $blog->total,

			);
			

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($post)); 
		
	}

	


public function skills($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->shop_orders_model->get_id($id);

			$post = array(			
				$blog->skills
			);
			

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output($blog->skills); 
		}
	}





public function create($user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Headers: authorization, Content-Type");


		$token = $this->input->get_request_header('Authorization');


			$name = $this->input->post('name');
			$city = $this->input->post('city');
			$zip = $this->input->post('zip');
			$address = $this->input->post('address');
			$province = $this->input->post('province');
			$email = $this->input->post('email');
			$phone = $this->input->post('phone');
			$skills = $this->input->post('skills');
			$total = $this->input->post('total');


		
	        	$blogData = array(
					'name' => $name,
					'city' => $city,
					'zip' => $zip,
					'address' => $address,
					'province' => $province,
					'email' => $email,
					'user_id' => $user_id,
					'phone' => $phone,
					'total' => $total,
					'skills' => $skills,
					'created_at' => date('Y-m-d H:i:s', time())
				);


				$isValidToken = $this->api_model->checkToken($token, $user_id);
		
				if($isValidToken) {
				

				$id = $this->shop_orders_model->create($blogData);

					$response = array(
						'status' => 'success'
					);
				}

				else {
	   
					$response = array(
						'status' => 'error'
					);
	            }

			
			

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($response)); 
		
	}



	public function update($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->shop_orders_model->get_id($id);
			$filename = $blog->image;

			$title = $this->input->post('title');
			$description = $this->input->post('description');
			$category_id = $this->input->post('category_id');
			$date = $this->input->post('date');
			$works_id = $this->input->post('works_id');
			$is_featured = $this->input->post('is_featured');
			$is_active = $this->input->post('is_active');
			$user_id = $this->input->post('user_id');
			$skills = $this->input->post('skills');
			$subtotal = $this->input->post('subtotal');
			$vat = $this->input->post('vat');
			$total = $this->input->post('total');

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
	   
					if($blog->image && file_exists(FCPATH.'media/images/'.$blog->image))
					{
						unlink(FCPATH.'media/images/'.$blog->image);
					}

	            	$uploadData = $this->upload->data();
            		$filename = $uploadData['file_name'];
	            }
			}

			if( ! $isUploadError) {
	        	$blogData = array(
					'title' => $title,
					'user_id' => 1,
					'description' => $description,
					'category_id' => $category_id,
					'works_id' => $works_id,
					'date' => $date,
					'image' => $filename,
					'is_featured' => $is_featured,
					'skills' => $skills,
					'subtotal' => $subtotal,
					'vat' => $vat,
					'total' => $total,
					'user_id' => $user_id,
					'is_active' => $is_active
				);

				$this->shop_orders_model->update($id, $blogData);

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

			$blog = $this->shop_orders_model->get_id($id);

			if($blog->image && file_exists(FCPATH.'media/images/'.$blog->image))
			{
				unlink(FCPATH.'media/images/'.$blog->image);
			}

			$this->shop_orders_model->delete($id);

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