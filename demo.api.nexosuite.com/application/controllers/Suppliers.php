<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Suppliers extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('api_model');
		$this->load->model('suppliers_model');
		$this->load->helper('url');
		$this->load->helper('text');
	}

	



	public function count($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

			$posts = $this->suppliers_model->count_suppliers($id);
	
		
	}


	public function index()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->suppliers_model->get_suppliers();
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'name' => $blog->name,
					'surname' => $blog->surname,
					'city' => $blog->city,
					'zip' => $blog->zip,
					'email' => $blog->email,
					'phone' => $blog->phone,
					'fiscalcode' => $blog->fiscalcode,
					'fiscalnumber' => $blog->fiscalnumber,
					'is_featured' => $blog->is_featured,
					'address' => $blog->address,
					'province' => $blog->province,
					'region' => $blog->region,
					'description' => $blog->description,
					'skills' => $blog->skills,
					'category_id' => $blog->category_id,
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

		$size = $this->suppliers_model->count_suppliers_search($category_name, $category_description, $user_id);
     
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


			$blogs = $this->suppliers_model->get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description);

			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'name' => $blog->name,
					'surname' => $blog->surname,
					'company_name' => $blog->company_name,
					'city' => $blog->city,
					'zip' => $blog->zip,
					'email' => $blog->email,
					'phone' => $blog->phone,
					'fiscalcode' => $blog->fiscalcode,
					'fiscalnumber' => $blog->fiscalnumber,
					'is_featured' => $blog->is_featured,
					'address' => $blog->address,
					'province' => $blog->province,
					'region' => $blog->region,
					'description' => $blog->description,
					'category_id' => $blog->category_id,
					'date' => $blog->date,
					'skills' => $blog->skills,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at

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



	public function user($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $id);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->suppliers_model->get_suppliers_user($id);
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'name' => $blog->name,
					'surname' => $blog->surname,
					'company_name' => $blog->company_name,
					'city' => $blog->city,
					'zip' => $blog->zip,
					'email' => $blog->email,
					'phone' => $blog->phone,
					'fiscalcode' => $blog->fiscalcode,
					'fiscalnumber' => $blog->fiscalnumber,
					'is_featured' => $blog->is_featured,
					'address' => $blog->address,
					'province' => $blog->province,
					'region' => $blog->region,
					'description' => $blog->description,
					'category_id' => $blog->category_id,
					'date' => $blog->date,
					'skills' => $blog->skills,
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



public function skills($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->suppliers_model->get_id($id);

			$post = array(			
				$blog->skills
			);
			

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output($blog->skills); 
		}
	}



	public function id($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->suppliers_model->get_id($id);

			$post = array(
				'id' => $blog->id,
				'name' => $blog->name,
				'surname' => $blog->surname,
				'company_name' => $blog->company_name,
				'city' => $blog->city,
				'zip' => $blog->zip,
				'address' => $blog->address,
				'province' => $blog->province,
				'region' => $blog->region,
				'email' => $blog->email,
				'phone' => $blog->phone,
				'fiscalcode' => $blog->fiscalcode,
				'fiscalnumber' => $blog->fiscalnumber,
				'description' => $blog->description,
				'image' => base_url('media/images/'.$blog->image),
				'is_featured' => $blog->is_featured,
				'date' => $blog->date,
				'skills' => $blog->skills,
				'user_id' => $blog->user_id,
				'category_id' => $blog->category_id,
				'is_active' => $blog->is_active
			);
			

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($post)); 
		}
	}

	

public function search()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");


			$id= $this->input->get('name');


			$blog = $this->suppliers_model->search($id);

			$post = array(
				'id' => $blog->id
			);
			

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($post)); 
		
	}




public function create($user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$name = $this->input->post('name');
			$surname = $this->input->post('surname');
			$company_name = $this->input->post('company_name');
			$city = $this->input->post('city');
			$user_id = $this->input->post('user_id');
			$zip = $this->input->post('zip');
			$address = $this->input->post('address');
			$province = $this->input->post('province');
			$region = $this->input->post('region');
			$email = $this->input->post('email');
			$phone = $this->input->post('phone');
			$fiscalcode = $this->input->post('fiscalcode');
			$fiscalnumber = $this->input->post('fiscalnumber');
			$description = $this->input->post('description');
			$is_featured = $this->input->post('is_featured');
			$is_active = $this->input->post('is_active');
			$date = $this->input->post('date');
			$category_id = $this->input->post('category_id');
			$skills = $this->input->post('is_active');

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
					'name' => $name,
					'surname' => $surname,
					'company_name' => $company_name,
					'city' => $city,
					'zip' => $zip,
					'address' => $address,
					'province' => $province,
					'region' => $region,
					'email' => $email,
					'phone' => $phone,
					'fiscalcode' => $fiscalcode,
					'fiscalnumber' => $fiscalnumber,
					'user_id' => $user_id,
					'description' => $description,
					'image' => $filename,
					'category_id' => $category_id,
					'date' => $date,
					'skills' => $skills,
					'is_featured' => $is_featured,
					'is_active' => $is_active,
					'created_at' => date('Y-m-d H:i:s', time())
				);

				$id = $this->suppliers_model->create($blogData);

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

			$blog = $this->suppliers_model->get_id($id);
			$filename = $blog->image;

			$name = $this->input->post('name');
			$surname = $this->input->post('surname');
			$company_name = $this->input->post('company_name');
			$city = $this->input->post('city');
			$zip = $this->input->post('zip');
			$address = $this->input->post('address');
			$province = $this->input->post('province');
			$region = $this->input->post('region');
			$email = $this->input->post('email');
			$phone = $this->input->post('phone');
			$fiscalcode = $this->input->post('fiscalcode');
			$fiscalnumber = $this->input->post('fiscalnumber');
			$description = $this->input->post('description');
			$category_id = $this->input->post('category_id');
			$date = $this->input->post('date');
			$user_id = $this->input->post('user_id');
			$skills = $this->input->post('skills');

			$is_featured = $this->input->post('is_featured');
			$is_active = $this->input->post('is_active');

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
					'name' => $name,
					'surname' => $surname,
					'company_name' => $company_name,
					'city' => $city,
					'zip' => $zip,
					'address' => $address,
					'province' => $province,
					'region' => $region,
					'email' => $email,
					'phone' => $phone,
					'fiscalcode' => $fiscalcode,
					'fiscalnumber' => $fiscalnumber,
					'user_id' => $user_id,
					'description' => $description,
					'category_id' => $category_id,
					'date' => $date,
					'skills' => $skills,
					'image' => $filename,
					'is_featured' => $is_featured,
					'is_active' => $is_active
				);

				$this->suppliers_model->update($id, $blogData);

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

			$blog = $this->suppliers_model->get_id($id);

			if($blog->image && file_exists(FCPATH.'media/images/'.$blog->image))
			{
				unlink(FCPATH.'media/images/'.$blog->image);
			}

			$this->suppliers_model->delete($id);

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
