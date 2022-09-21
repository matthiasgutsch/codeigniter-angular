<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tasks extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('api_model');
		$this->load->model('tasks_model');
		$this->load->model('projects_model');
		$this->load->model('employee_model');
		$this->load->helper('url');
		$this->load->helper('text');
        $this->load->helper('api');

	}



	public function tasks_by_employee($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->tasks_model->get_tasks_by_employee($id, $user_id);
			foreach($blogs as $blog) {


				if($blog->project_id){
				$projectNameArray = $this->projects_model->get_id($blog->project_id);
				$projectName = $projectNameArray->title;
			    }else{$projectName = '';}

				

				$employeeNameArray = $this->employee_model->get_id($blog->employee_id);
				$employeeName = $employeeNameArray->username;


				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'description' => $blog->description,
					'category_id' => $blog->category_id,
					'brand_id' => $blog->brand_id,
					'location_id' => $blog->location_id,
					'code' => $blog->code,
					'code_int' => $blog->code_int,
					'status' => $blog->status,
					'user_id' => $blog->user_id,
					'employee_id' => $employeeName,
					'price' => $blog->price,
					'price_extra' => $blog->price_extra,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at,
					'project_name' => $projectName,
					'priority' => $blog->priority,


				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		}
	}







public function update_priority($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->tasks_model->get_id($id);

			$priority = $this->input->post('priority');
			


			$isUploadError = FALSE;

			

			if( ! $isUploadError) {
	        	$blogData = array(
					'priority' => $priority,
				);

				$this->tasks_model->update($id, $blogData);
		


				$response = array(
					'status' => 'success'
				);


				$blogData = $this->tasks_model->get_id($id);
				$projectDataArray = $this->projects_model->get_id($blogData->project_id);
				$projectData = $projectDataArray->title;
				$this->sendemailTasks($blogData, $projectData);


           	}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($response)); 
		}
	}





public function update_priority_employee($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->tasks_model->get_id($id);

			$priority = $this->input->post('priority');
			


			$isUploadError = FALSE;

			

			if( ! $isUploadError) {
	        	$blogData = array(
					'priority' => $priority,
				);

				$this->tasks_model->update($id, $blogData);
		


				$response = array(
					'status' => 'success'
				);
			
				$blogData = $this->tasks_model->get_id($id);
				$projectDataArray = $this->projects_model->get_id($blogData->project_id);
				$projectData = $projectDataArray->title;
				$this->sendemailTasks($blogData, $projectData);

           	}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($response)); 
		}
	}



public function sendemailTasks($blogData, $projectData)
	{
		

		$message = '<p>Hi, <br />Aggiornato Task "'.$blogData->title.'" </p>';
		$message .= '<h2>Progetto: </strong>'.$projectData.'</h2>';


		if($blogData->priority == '1') {
		$message .= '<p><strong>Priorità: </strong>Da Fare</p>';
		}

		if($blogData->priority == '2') {
		$message .= '<p><strong>Priorità: </strong>25% Fatto</p>';
		}


		if($blogData->priority == '3') {
		$message .= '<p><strong>Priorità: </strong>75% Fatto</p>';
		}

		if($blogData->priority == '4') {
		$message .= '<p><strong>Priorità: </strong>Fatto</p>';
		}
		
		$message .= '<br />Thanks';

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
		$this->email->to('matthias.gutsch@gmail.com');
		$this->email->bcc('hello@startupinspire.com', 'Tasks Desk');

		$this->email->subject('Aggiornamento Task '.$projectData.'' );
		$this->email->message($message);

		$this->email->send();
	}



	public function tasks_by_client($id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		if($isValidToken) {

		$items = $this->tasks_model->get_tasks_by_client($id);

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
					'created_at' => $item->created_at,
					'price' => $item->price,
					'price_extra' => $item->price_extra,

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

			$posts = $this->tasks_model->count_tasks($id);
	
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
			$blogs = $this->tasks_model->get_tasks();
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
					'price' => $blog->price,
					'price_extra' => $blog->price_extra,
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




public function user_project($project_id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);
		

		


		$posts = array();
		if($isValidToken) {
			$blogs = $this->tasks_model->get_tasks_project($project_id, $user_id);
			foreach($blogs as $blog) {

			$projectNameArray = $this->projects_model->get_id($project_id);
			$projectName = $projectNameArray->title;
			
			$employeeNameArray = $this->employee_model->get_id($blog->employee_id);
			$employeeName = $employeeNameArray->username;

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
					'employee_id' => $employeeName,
					'price' => $blog->price,
					'price_extra' => $blog->price_extra,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at,
					'skills' => $blog->skills,
					'dimensions' => $blog->dimensions,
					'weight' => $blog->weight,
					'project_name' => $projectName,
					'priority' => $blog->priority,
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
			$blogs = $this->tasks_model->get_tasks($user_id);
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
					'employee_id' => $blog->employee_id,
					'user_id' => $blog->user_id,
					'price' => $blog->price,
					'price_extra' => $blog->price_extra,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at,
					'skills' => $blog->skills,
					'dimensions' => $blog->dimensions,
					'weight' => $blog->weight,
					'priority' => $blog->priority,
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

			$blogs = $this->tasks_model->get_tasks_date();
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
					'price' => $blog->price,
					'price_extra' => $blog->price_extra,
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
			$blogs = $this->tasks_model->get_tasks_calendar();
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
					'price' => $blog->price,
					'price_extra' => $blog->price_extra,
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

			$blog = $this->tasks_model->get_id($id);

			$post = array(
				'id' => $blog->id,
				'title' => $blog->title,
				'description' => $blog->description,
				'image' => base_url('media/images/'.$blog->image),
				'is_featured' => $blog->is_featured,
				'project_id' => $blog->project_id,
				'code' => $blog->code,
				'code_int' => $blog->code_int,
				'status' => $blog->status,
				'user_id' => $blog->user_id,
				'employee_id' => $blog->employee_id,
				'category_id' => $blog->category_id,
				'price' => $blog->price,
				'price_extra' => $blog->price_extra,
				'description_full' => $blog->description_full,
				'works_id' => $blog->works_id,
				'brand_id' => $blog->brand_id,
				'skills' => $blog->skills,
				'location_id' => $blog->location_id,
				'is_active' => $blog->is_active,
				'priority' => $blog->priority,

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

			$blog = $this->tasks_model->get_id($id);

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
			$priority = $this->input->post('priority');
			$description = $this->input->post('description');
			$project_id = $this->input->post('project_id');
			$user_id = $this->input->post('user_id');
			$employee_id = $this->input->post('employee_id');


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
					'description' => $description,
					'priority' => $priority,
					'project_id' => $project_id,
					'employee_id' => $employee_id,
					'user_id' => $user_id,
					'created_at' => date('Y-m-d H:i:s', time())
				);

				$id = $this->tasks_model->create($blogData);

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

			$blog = $this->tasks_model->get_id($id);
			$title = $this->input->post('title');
			$description = $this->input->post('description');
			$project_id = $this->input->post('project_id');
			$employee_id = $this->input->post('employee_id');
			$priority = $this->input->post('priority');
			$user_id = $this->input->post('user_id');
			


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
					'description' => $description,
					'project_id' => $project_id,
					'employee_id' => $employee_id,
					'priority' => $priority,
					'user_id' => $user_id,

				);

				$this->tasks_model->update($id, $blogData);

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

			$blog = $this->tasks_model->get_id($id);

			if($blog->image && file_exists(FCPATH.'media/images/'.$blog->image))
			{
				unlink(FCPATH.'media/images/'.$blog->image);
			}

			$this->tasks_model->delete($id);

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