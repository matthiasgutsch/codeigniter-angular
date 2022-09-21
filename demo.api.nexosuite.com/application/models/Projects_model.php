<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Projects_model extends CI_Model 
{
	

	public function get_projects_by_client($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('projects');
            $this->db->where('category_id', $id);
			$this->db->order_by('date','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

        } else {
            return null;
        }

    }



public function get_projects_calendar()
	{

			$this->db->select('*');
            $this->db->from('projects');
			$this->db->where('is_featured', '1');
			$this->db->order_by('date','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}
	





public function count_projects_search($category_name=NULL, $category_description=NULL, $user_id)
	{
	$this->db->select('*');
	$this->db->from('projects');
	$this->db->where('projects.user_id', $user_id);

	if($category_name!=NULL && $category_description!=NULL)
			{
			//$this->db->where('created_at >=',$startup_startDate); 
            //$this->db->where('created_at <=',$startup_endDate);
			$this->db->where("projects.created_at BETWEEN '".$category_name."' AND '".$category_description."'");
		   }
	
	return $this->db->count_all_results();
	
	}



public function get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description)
	{

			$this->db->select('*');
            $this->db->from('projects');
			//$this->db->like('works.category_name', $category_name);
			//$this->db->like('works.category_description', $category_description);
			$this->db->where('projects.user_id', $user_id);
			 if($category_name!=NULL && $category_description!=NULL)
				{
				//$this->db->where('created_at >=',$startup_startDate); 
	            //$this->db->where('created_at <=',$startup_endDate);
				$this->db->where("projects.created_at BETWEEN '".$category_name."' AND '".$category_description."'");
			   }



			$this->db->order_by('id', 'DESC'); 
			if ($_start == 0 &&  $_limit != '') {
	            $this->db->limit($_limit);
	        } else if ($_start != 0  && $_limit != '') {
	            $this->db->limit($_limit,$_start);
	        }


		    $query  = $this->db->get();
			
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return array();
            }
}




public function get_projects($user_id)
	{

			$this->db->select('*');
            $this->db->from('projects');
			$this->db->where('projects.user_id', $user_id);

			
            $query = $this->db->get();

            if ($query->num_rows() > 0) {
				
                return $query->result();
				
            } else {
                return null;
            }



	}



	public function count_projects($id)
	{
	$this->db->select('*');
	$this->db->from('projects');
	$this->db->where('projects.user_id', $id);

	echo $this->db->count_all_results();

	}




	public function count_project_hours($id)
	{
	$query = $this->db->query("select id, sum(hours) as total_amt from timesheets WHERE project_id = '$id' && timesheets_type = 1");

				foreach ($query->result() as $row)
				{
				    return $row->total_amt;
				}
	}



public function get_projects_timesheets_chart($project_id) {
        $userdata = array();

        $this->db->select('SUM(hours) as total, date_from');
        $this->db->from('timesheets');
        //$this->db->where('YEAR(date) = YEAR(NOW())');
        //$this->db->where('YEAR(date) = 2022');

		$this->db->where('timesheets.project_id', $project_id);
		$this->db->where('timesheets.timesheets_type', 1);

        $this->db->group_by('MONTH(date_from)');
		$this->db->order_by('date_from','ASC');

        $query = $this->db->get();

        foreach ($query->result_array() as $result) {
            $userdata[] = array(
                'x' => date('Y-m-d 00:00', strtotime($result['date_from'])),
                'y' => $result['total']
            );
        }

        return $userdata;
    }



public function get_projects_date($current_month=NULL)
	{

			$date = new DateTime("now");
			$curr_date = $date->format('Y-m-d ');
			$this->db->select('*');
            $this->db->from('projects');
			$this->db->where('date(Date)',$curr_date);//use date function
			$this->db->order_by('date','ASC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


	public function get_id($id)
	{

		$this->db->select('projects.*, u.first_name, u.last_name');
			$this->db->from('projects');
			$this->db->join('users u', 'u.id=projects.user_id');
			$this->db->where('projects.id', $id);
			$query = $this->db->get();
			return $query->row();
	}




	

	

	public function login($username, $password) 
	{
		$this->db->where('username', $username);
		$this->db->where('password', md5($password));
		$query = $this->db->get('users');

		if($query->num_rows() == 1) {
			return $query->row();
		}
	}


	public function checkToken($token)
	{
		$this->db->where('token', $token);
		$query = $this->db->get('users');

		if($query->num_rows() == 1) {
			return true;
		}
		return false;
	}

	public function create($blogData)
	{
		$this->db->insert('projects', $blogData);
		return $this->db->insert_id();
	}




	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('projects', $blogData);
	}


	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('projects');
	}


}
