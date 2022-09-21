<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Billings extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('api_model');
		$this->load->model('billings_model');
		$this->load->model('clients_model');
		$this->load->helper('url');
		$this->load->helper('text');
        $this->load->helper('api');

	}

	



public function get_billings_by_order_id($user_id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);


		$items = $this->billings_model->get_billings_by_order_id($user_id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'title' => $item->title,
					'description' => $item->description,
					'category_id' => $item->category_id,
					'order_id' => $item->order_id,
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




	public function billings_by_client($id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		//$isValidToken = $this->api_model->checkToken($token, $user_id);


		$items = $this->billings_model->get_billings_by_client($id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'number' => $item->number,
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




public function update_skills($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->billings_model->get_id($id);

			$skills = $this->input->post('skills');
			


			$isUploadError = FALSE;

			

			if( ! $isUploadError) {
	        	$blogData = array(
					'skills' => $skills,

				);

				$this->billings_model->update($id, $blogData);

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




	public function count($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

			$posts = $this->billings_model->count_billings($id);
	
		
	}



	public function count_total($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");


		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $id);

		if($isValidToken) {



		$posts = $this->billings_model->count_total_billings($id);

		
		}
	}



	public function count_total_no_paid($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");


		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $id);

		if($isValidToken) {



		$posts = $this->billings_model->count_total_billings_not_paid($id);

		
		}
	}



public function billings_by_appointment_id($user_id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);


		$items = $this->billings_model->get_billings_by_appointment_id($user_id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'number' => $item->number,
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



public function billings_by_appointments($user_id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);


		$items = $this->billings_model->get_billings_by_appointments($user_id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'number' => $item->number,
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
			$blogs = $this->billings_model->get_billings();
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'number' => $blog->number,
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
		$client_description = $this->input->get('client');

		$size = $this->billings_model->count_billings_search($category_name, $category_description, $client_description, $user_id);
     
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
				$client_description = $this->input->get('client');

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


			$blogs = $this->billings_model->get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description, $client_description);

			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'number' => $blog->number,
					'title' => $blog->title,
					'description' => $blog->description,
					'client' => $this->clients_model->get_id($blog->category_id),
					'category_id' => $blog->category_id,
					'appointment_id' => $blog->appointment_id,
					'date' => date("d-m-Y", strtotime($blog->date)),
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at,
					'year' => date("Y", strtotime($blog->date)),
					'skills' => $blog->skills,
					'total' => $blog->total,
					'vat' => $blog->vat,
					'is_paid' => $blog->is_paid,
					'subtotal' => $blog->subtotal,
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
			$blogs = $this->billings_model->get_billings($user_id);
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'number' => $blog->number,
					'title' => $blog->title,
					'description' => $blog->description,
					'client' => $this->clients_model->get_id($blog->category_id),
					'category_id' => $blog->category_id,
					'appointment_id' => $blog->appointment_id,
					'date' => $blog->date,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at,
					'skills' => $blog->skills,
					'total' => $blog->total,
					'vat' => $blog->vat,
					'is_paid' => $blog->is_paid,
					'subtotal' => $blog->subtotal,

				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		}
	}


	public function id($appointment_id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->billings_model->get_id($appointment_id);

			$post = array(
				'id' => $blog->id,
				'number' => $blog->number,
				'title' => $blog->title,
				'description' => $blog->description,
				'is_featured' => $blog->is_featured,
				'date' => $blog->date,
				'appointment_id' => $blog->appointment_id,
				'order_id' => $blog->order_id,
				'category_id' => $blog->category_id,
				'skills' => $blog->skills,
				'works_id' => $blog->works_id,
				'user_id' => $blog->user_id,
				'subtotal' => $blog->subtotal,
				'vat' => $blog->vat,
				'total' => $blog->total,
				'is_paid' => $blog->is_paid,

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

			$blog = $this->billings_model->get_id($id);

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

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$title = $this->input->post('title');
			$number = $this->input->post('number');
			$description = $this->input->post('description');
			$is_featured = $this->input->post('is_featured');
			$appointment_id = $this->input->post('appointment_id');
			$order_id = $this->input->post('order_id');
			$is_active = $this->input->post('is_active');
			$date = $this->input->post('date');
			$category_id = $this->input->post('category_id');
			$works_id = $this->input->post('works_id');
			$user_id = $this->input->post('user_id');
			$skills = $this->input->post('skills');
			$subtotal = $this->input->post('subtotal');
			$vat = $this->input->post('vat');
			$total = $this->input->post('total');
			$is_paid = $this->input->post('is_paid');

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
					'user_id' => 1,
					'number' => $number,
					'description' => $description,
					'image' => $filename,
					'category_id' => $category_id,
					'date' => $date,
					'is_featured' => $is_featured,
					'appointment_id' => $appointment_id,
					'order_id' => $order_id,
					'works_id' => $works_id,
					'user_id' => $user_id,
					'subtotal' => $subtotal,
					'vat' => $vat,
					'total' => $total,
					'skills' => $skills,
					'is_paid' => 0,
					'created_at' => date('Y-m-d H:i:s', time())
				);

				$id = $this->billings_model->create($blogData);

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




	public function update($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->billings_model->get_id($id);
			$filename = $blog->image;
			$number = $this->input->post('number');
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
			$is_paid = $this->input->post('is_paid');

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
					'number' => $number,
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
					'is_paid' => $is_paid,
					'is_active' => $is_active
				);

				$this->billings_model->update($id, $blogData);

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



public function billing_status($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->billings_model->get_id($id);

			$is_paid = $this->input->post('is_paid');
			


			$isUploadError = FALSE;

			

			if( ! $isUploadError) {
	        	$blogData = array(
					'is_paid' => $is_paid,

				);

				$this->billings_model->update($id, $blogData);

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

			$blog = $this->billings_model->get_id($id);

			if($blog->image && file_exists(FCPATH.'media/images/'.$blog->image))
			{
				unlink(FCPATH.'media/images/'.$blog->image);
			}

			$this->billings_model->delete($id);

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