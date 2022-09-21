<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class documents_model extends CI_Model 
{
	

	public function get_documents_by_client($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('documents');
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



public function get_list($user_id, $_start, $_limit, $_sort, $title, $description, $id)
	{

			$this->db->select('*');
            $this->db->from('documents');
			$this->db->like('documents.title', $title);
			$this->db->like('documents.description', $description);
			$this->db->where('documents.folder_id', $id);
			$this->db->where('documents.user_id', $user_id);

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


public function count_documents_search($title=NULL, $description=NULL, $user_id, $id)
	{
	$this->db->select('*');
	$this->db->from('documents');
	$this->db->where('documents.folder_id', $id);
	$this->db->where('documents.user_id', $user_id);

	if($title!=NULL)
    $this->db->like('title', $title);
	if($description!=NULL)
    $this->db->like('description', $description);


	return $this->db->count_all_results();
	
	}


	





	public function count_documents($id)
	{
	$this->db->select('*');
	$this->db->from('documents');
	$this->db->where('documents.user_id', $id);

	echo $this->db->count_all_results();

	}





public function get_documents_date($current_month=NULL)
	{

			$date = new DateTime("now");
			$curr_date = $date->format('Y-m-d ');
			$this->db->select('*');
            $this->db->from('documents');
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

		$this->db->select('documents.*, u.first_name, u.last_name');
			$this->db->from('documents');
			$this->db->join('users u', 'u.id=documents.user_id');
			$this->db->where('documents.id', $id);
			$query = $this->db->get();
			return $query->row();
	}


	public function get_image_name($id)
	{

			$this->db->select('documents.*, u.first_name, u.last_name');
			$this->db->from('documents');
			$this->db->join('users u', 'u.id=documents.user_id');
			$this->db->where('documents.id', $id);
		    $row = $this->db->get()->row();
		    if (isset($row)) {
		        return $row->image;
		    } else {
		        return false;
		    }

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
		$this->db->insert('documents', $blogData);
		return $this->db->insert_id();
	}




	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('documents', $blogData);
	}


	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('documents');
	}


}
