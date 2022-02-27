<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Purchase_orders extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('api_model');
		$this->load->model('purchase_orders_model');
		$this->load->model('suppliers_model');
		$this->load->helper('url');
		$this->load->helper('text');
        $this->load->helper('api');

	}




public function get_order_by_quotes_id($user_id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);


		$items = $this->purchase_orders_model->get_order_by_quotes_id($user_id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'title' => $item->title,
					'description' => $item->description,
					'category_id' => $item->category_id,
					'quotes_id' => $item->quotes_id,
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
	


	public function orders_by_client($id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		//$isValidToken = $this->api_model->checkToken($token, $user_id);


		$items = $this->purchase_orders_model->get_purchase_orders_by_client($id);

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

			$posts = $this->purchase_orders_model->count_orders($id);
	
		
	}



	public function count_total($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$posts = $this->purchase_orders_model->count_total_orders($id);

		
		
	}





	public function index()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->purchase_orders_model->get_purchase_orders();
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



public function user($user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->purchase_orders_model->get_purchase_orders($user_id);
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'description' => $blog->description,
					'category_id' => $blog->category_id,
					'appointment_id' => $blog->appointment_id,
					'supplier' => $this->suppliers_model->get_id($blog->category_id),
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


	public function id($appointment_id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->purchase_orders_model->get_id($appointment_id);

			$post = array(
				'id' => $blog->id,
				'title' => $blog->title,
				'description' => $blog->description,
				'is_featured' => $blog->is_featured,
				'date' => $blog->date,
				'quotes_id' => $blog->quotes_id,
				'category_id' => $blog->category_id,
				'skills' => $blog->skills,
				'works_id' => $blog->works_id,
				'user_id' => $blog->user_id,
				'subtotal' => $blog->subtotal,
				'vat' => $blog->vat,
				'total' => $blog->total,


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

			$blog = $this->purchase_orders_model->get_id($id);

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
			$description = $this->input->post('description');
			$is_featured = $this->input->post('is_featured');
			$quotes_id = $this->input->post('quotes_id');
			$is_active = $this->input->post('is_active');
			$date = $this->input->post('date');
			$category_id = $this->input->post('category_id');
			$works_id = $this->input->post('works_id');
			$user_id = $this->input->post('user_id');
			$skills = $this->input->post('skills');
			$subtotal = $this->input->post('subtotal');
			$vat = $this->input->post('vat');
			$total = $this->input->post('total');

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
					'description' => $description,
					'image' => $filename,
					'category_id' => $category_id,
					'date' => $date,
					'is_featured' => $is_featured,
					'quotes_id' => $quotes_id,
					'works_id' => $works_id,
					'user_id' => $user_id,
					'subtotal' => $subtotal,
					'vat' => $vat,
					'total' => $total,
					'skills' => $skills,
					'created_at' => date('Y-m-d H:i:s', time())
				);

				$id = $this->purchase_orders_model->create($blogData);

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




public function update_skills($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->purchase_orders_model->get_id($id);

			$skills = $this->input->post('skills');
			


			$isUploadError = FALSE;

			

			if( ! $isUploadError) {
	        	$blogData = array(
					'skills' => $skills,

				);

				$this->purchase_orders_model->update($id, $blogData);

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

			$blog = $this->purchase_orders_model->get_id($id);
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

				$this->purchase_orders_model->update($id, $blogData);

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

			$blog = $this->purchase_orders_model->get_id($id);

			if($blog->image && file_exists(FCPATH.'media/images/'.$blog->image))
			{
				unlink(FCPATH.'media/images/'.$blog->image);
			}

			$this->purchase_orders_model->delete($id);

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