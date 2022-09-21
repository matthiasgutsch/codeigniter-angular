<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Charts extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('api_model');
		$this->load->model('charts_model');
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

		$items = $this->products_model->get_products_by_client($id);

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



	public function count($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $id);

		if($isValidToken) {

			$posts = $this->products_model->count_products($id);
	
		}
	}


	public function index()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');


		$posts = array();
			$blogs = $this->charts_model->get_products();
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

					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at

				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		
	}




public function total() {
        foreach ($this->charts_model->get_monthly_user_total() as $result) {
            $data[] = array(
                'month' => $result['month'],
                'total' => $result['total']
            );
        }

        $this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($data)); 
    }



public function user($user_id) {

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');


		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

        foreach ($this->charts_model->get_monthly_total_invoice($user_id) as $result) {
            $data[] = array(
                'x' => $result['x'],
                'y' => number_format((float)$result['y'], 2, '.', ''),
            );
        }

        $this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($data)); 
    }

  }


public function user_none($user_id) {

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');


		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

        foreach ($this->charts_model->get_monthly_total_invoice_none($user_id) as $result) {
            $data[] = array(
                'x' => $result['x'],
                'y' => number_format((float)$result['y'], 2, '.', ''),
            );
        }

        $this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($data)); 
    }

  }


public function user_old($user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);


			$posts = array();
			if($isValidToken) {

			$blogs = $this->charts_model->findSensorsByDate($user_id);
			foreach($blogs as $blog) {

				$posts[] = array(

					'x' => date("d", strtotime($blog->date)),
					'y' => number_format((float)$blog->total, 2, '.', ''),

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

			$blogs = $this->products_model->get_products_date();
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
	
	
	public function calendar()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->products_model->get_products_calendar();
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

			$blog = $this->products_model->get_id($id);

			$post = array(
				'id' => $blog->id,
				'title' => $blog->title,
				'description' => $blog->description,
				'image' => base_url('media/images/'.$blog->image),
				'is_featured' => $blog->is_featured,
				'code' => $blog->code,
				'code_int' => $blog->code_int,
				'status' => $blog->status,
				'user_id' => $blog->user_id,
				'category_id' => $blog->category_id,
				'description_full' => $blog->description_full,
				'works_id' => $blog->works_id,
				'brand_id' => $blog->brand_id,
				'skills' => $blog->skills,
				'location_id' => $blog->location_id,
				'is_active' => $blog->is_active
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

			$blog = $this->products_model->get_id($id);

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


		$items = $this->products_model->get_products_data($id, $user_id);

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
			$description = $this->input->post('description');
			$is_featured = $this->input->post('is_featured');
			$is_active = $this->input->post('is_active');
			$code = $this->input->post('code');
			$code_int = $this->input->post('code_int');
			$description_full = $this->input->post('description_full');
			$works_id = $this->input->post('works_id');
			$category_id = $this->input->post('category_id');
			$status = $this->input->post('status');
			$user_id = $this->input->post('user_id');
			$location_id = $this->input->post('location_id');
			$brand_id = $this->input->post('brand_id');
			$works_id = $this->input->post('works_id');
			$skills = $this->input->post('skills');


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
					'description_full' => $description_full,
					'works_id' => $works_id,
					'category_id' => $category_id,
					'brand_id' => $brand_id,
					'status' => $status,
					'location_id' => $location_id,
					'code' => $code,
					'user_id' => $user_id,
					'code_int' => $code_int,
					'is_featured' => $is_featured,
					'is_active' => $is_active,
					'skills' => $skills,
					'created_at' => date('Y-m-d H:i:s', time())
				);

				$id = $this->products_model->create($blogData);

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

			$blog = $this->products_model->get_id($id);
			$filename = $blog->image;

			$title = $this->input->post('title');
			$description = $this->input->post('description');
			$description_full = $this->input->post('description_full');
			$works_id = $this->input->post('works_id');
			$location_id = $this->input->post('location_id');
			$brand_id = $this->input->post('brand_id');
			$status = $this->input->post('status');

			$code = $this->input->post('code');
			$code_int = $this->input->post('code_int');
			$user_id = $this->input->post('user_id');
			$category_id = $this->input->post('category_id');

			$is_featured = $this->input->post('is_featured');
			$is_active = $this->input->post('is_active');
			$skills = $this->input->post('skills');


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
					'description_full' => $description_full,
					'works_id' => $works_id,
					'category_id' => $category_id,
					'location_id' => $location_id,
					'brand_id' => $brand_id,
					'status' => $status,
					'code' => $code,
					'user_id' => $user_id,
					'code_int' => $code_int,
					'image' => $filename,
					'is_featured' => $is_featured,
					'is_active' => $is_active,
					'skills' => $skills

				);

				$this->products_model->update($id, $blogData);

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

			$blog = $this->products_model->get_id($id);

			if($blog->image && file_exists(FCPATH.'media/images/'.$blog->image))
			{
				unlink(FCPATH.'media/images/'.$blog->image);
			}

			$this->products_model->delete($id);

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