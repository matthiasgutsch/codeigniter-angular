<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Appointments_model extends CI_Model 
{
	

	public function get_appointments_by_client($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('appointments');
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



public function get_appointments_calendar()
	{

			$this->db->select('*');
            $this->db->from('appointments');
			$this->db->where('is_featured', '1');
			$this->db->order_by('date','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}
	



public function count_appointments_search($category_name=NULL, $category_description=NULL, $user_id)
	{
	$this->db->select('*');
	$this->db->from('appointments');
	$this->db->where('appointments.user_id', $user_id);

	if($category_name!=NULL && $category_description!=NULL)
			{
			//$this->db->where('created_at >=',$startup_startDate); 
            //$this->db->where('created_at <=',$startup_endDate);
			$this->db->where("appointments.date BETWEEN '".$category_name."' AND '".$category_description."'");
		   }
	
	return $this->db->count_all_results();
	
	}



public function get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description)
	{

			$this->db->select('*');
            $this->db->from('appointments');
			//$this->db->like('works.category_name', $category_name);
			//$this->db->like('works.category_description', $category_description);
			$this->db->where('appointments.user_id', $user_id);

			 if($category_name!=NULL && $category_description!=NULL)
				{
				//$this->db->where('created_at >=',$startup_startDate); 
	            //$this->db->where('created_at <=',$startup_endDate);
				$this->db->where("appointments.date BETWEEN '".$category_name."' AND '".$category_description."'");
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


public function get_appointments($user_id)
	{

			$this->db->select('*');
            $this->db->from('appointments');
			$this->db->where('appointments.user_id', $user_id);
			$this->db->order_by('date','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}






	public function count_appointments($id)
	{
	$this->db->select('*');
	$this->db->from('appointments');
	$this->db->where('appointments.user_id', $id);
	echo $this->db->count_all_results();

	}





public function get_appointments_date($id)
	{

			$date = new DateTime("now");
			$curr_date = $date->format('Y-m-d ');
			$this->db->select('*');
            $this->db->from('appointments');
			$this->db->where('appointments.user_id', $id);
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

		$this->db->select('appointments.*, u.first_name, u.last_name');
			$this->db->from('appointments');
			$this->db->join('users u', 'u.id=appointments.user_id');
			$this->db->where('appointments.id', $id);
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
		$this->db->insert('appointments', $blogData);
		return $this->db->insert_id();
	}




	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('appointments', $blogData);
	}


	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('appointments');
	}


}
