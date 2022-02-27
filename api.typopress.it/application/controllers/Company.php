<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Company extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('api_model');
		$this->load->model('company_model');
		$this->load->helper('url');
		$this->load->helper('text');
	}

	


	public function id($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->company_model->get_id($id);

			$post = array(
				'id' => $blog->id,
				'name' => $blog->name,
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
				'fiscaltype' => $blog->fiscaltype,
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

	





public function create($user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$name = $this->input->post('name');
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
			$fiscaltype = $this->input->post('fiscaltype');

			$is_featured = $this->input->post('is_featured');
			$is_active = $this->input->post('is_active');
			$user_id = $this->input->post('user_id');

			$isUploadError = FALSE;

			

			if( ! $isUploadError) {
	        	$categoryData = array(
					'name' => $name,
					'city' => $city,
					'zip' => $zip,
					'address' => $address,
					'province' => $province,
					'region' => $region,
					'email' => $email,
					'phone' => $phone,
					'fiscalcode' => $fiscalcode,
					'fiscalnumber' => $fiscalnumber,
					'user_id' => 1,
					'description' => $description,
					'category_id' => $category_id,
					'date' => $date,
					'fiscaltype' => $fiscaltype,
					'image' => $filename,
					'is_featured' => $is_featured,
					'is_active' => $is_active,
					'user_id' => $user_id

				);

				$id = $this->employee_model->create($categoryData);

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

			$blog = $this->company_model->get_id($id);
			$filename = $blog->image;

			$name = $this->input->post('name');
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
			$fiscaltype = $this->input->post('fiscaltype');
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
					'city' => $city,
					'zip' => $zip,
					'address' => $address,
					'province' => $province,
					'region' => $region,
					'email' => $email,
					'phone' => $phone,
					'fiscalcode' => $fiscalcode,
					'fiscalnumber' => $fiscalnumber,
					'user_id' => 1,
					'description' => $description,
					'category_id' => $category_id,
					'date' => $date,
					'fiscaltype' => $fiscaltype,
					'image' => $filename,
					'is_featured' => $is_featured,
					'is_active' => $is_active
				);

				$this->company_model->update($id, $blogData);

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

			$blog = $this->company_model->get_id($id);

			if($blog->image && file_exists(FCPATH.'media/images/'.$blog->image))
			{
				unlink(FCPATH.'media/images/'.$blog->image);
			}

			$this->company_model->delete($id);

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
